"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
  Volume2,
  VolumeX,
  X,
  Radio,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ListMusic,
  Disc,
} from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

interface SpotifyTrack {
  title: string;
  artist: string;
  url: string;
  coverUrl: string;
  duration: string;
}

export default function SpotifyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);

  // Live Track State
  const [liveTrack, setLiveTrack] = useState({
    title: "Offline",
    artist: "Not listening",
    album: "",
    albumImageUrl: "",
    songUrl: "",
    isPlaying: false,
    progressMs: 0,
    durationMs: 0,
  });

  // Local Audio Player State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [localPlaying, setLocalPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [localDuration, setLocalDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const curatedTracks: SpotifyTrack[] = portfolioConfig.spotify.curatedTracks;
  const currentLocalTrack = curatedTracks[currentTrackIndex];

  // Initialize and reload local Audio node
  useEffect(() => {
    // Save current playing state to restore it after loading new track
    const wasPlaying = localPlaying;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(currentLocalTrack.url);
    audioRef.current.volume = isMuted ? 0 : volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setLocalDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // If it was playing, play the new track automatically
    if (wasPlaying && !isLiveMode) {
      audio.play().catch(() => setLocalPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [currentTrackIndex]);

  // Control playback based on state
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (localPlaying && !isLiveMode) {
      audioRef.current.play().catch(() => setLocalPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [localPlaying, isLiveMode]);

  // Adjust Volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Poll Spotify API
  useEffect(() => {
    const fetchSpotifyStatus = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const data = await res.json();
          setIsConfigured(data.configured);
          
          if (data.configured) {
            setLiveTrack(data);
            
            // Auto switch to Live Mode if user starts listening to Spotify
            if (data.isPlaying && !isLiveMode) {
              setIsLiveMode(true);
              setLocalPlaying(false); // Pause local audio
            }
          }
        }
      } catch (e) {
        console.error("Error polling Spotify status:", e);
      }
    };

    fetchSpotifyStatus();
    const interval = setInterval(fetchSpotifyStatus, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, [isLiveMode]);

  const handlePlayPause = () => {
    if (isLiveMode) return; // Can't control live Spotify playback
    setLocalPlaying(!localPlaying);
  };

  const handleNext = () => {
    if (isLiveMode) return;
    setCurrentTrackIndex((prev) => (prev + 1) % curatedTracks.length);
  };

  const handlePrev = () => {
    if (isLiveMode) return;
    setCurrentTrackIndex((prev) => (prev - 1 + curatedTracks.length) % curatedTracks.length);
  };

  const selectTrack = (index: number) => {
    if (isLiveMode) {
      setIsLiveMode(false);
      setLocalPlaying(false);
    }
    setCurrentTrackIndex(index);
    setLocalPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLiveMode || !audioRef.current || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = clickX / width;
    audioRef.current.currentTime = newProgress * localDuration;
    setCurrentTime(newProgress * localDuration);
  };

  // Helper format seconds to M:SS
  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Dynamic values based on active mode
  const isMusicActive = isLiveMode ? liveTrack.isPlaying : localPlaying;
  const currentTitle = isLiveMode ? liveTrack.title : currentLocalTrack.title;
  const currentArtist = isLiveMode ? liveTrack.artist : currentLocalTrack.artist;
  const currentCover = isLiveMode 
    ? liveTrack.albumImageUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300"
    : currentLocalTrack.coverUrl;

  const currentDurationSec = isLiveMode ? liveTrack.durationMs / 1000 : localDuration;
  const currentProgressSec = isLiveMode ? liveTrack.progressMs / 1000 : currentTime;

  const currentDurationStr = formatTime(currentDurationSec);
  const currentProgressStr = formatTime(currentProgressSec);

  const percentProgress = currentDurationSec > 0 
    ? (currentProgressSec / currentDurationSec) * 100 
    : 0;

  return (
    <div className="fixed bottom-5 left-5 z-50 select-none font-poppins">
      <AnimatePresence>
        {!isOpen ? (
          // COLLAPSED COMPACT WIDGET (Pill)
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md hover:border-zinc-700/80 hover:bg-zinc-950/80 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.6)] cursor-pointer group select-none max-w-xs md:max-w-sm"
          >
            {/* Visualizer bars or rotating disk */}
            <div className="relative w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
              {isMusicActive ? (
                // Bouncing Equalizer Bars
                <div className="flex items-end gap-0.5 h-3">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-primary-sky rounded-full animate-bounce"
                      style={{
                        animationDuration: `${0.6 + i * 0.15}s`,
                        height: "100%",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <Disc className="w-4 h-4 text-zinc-500" />
              )}
            </div>

            {/* Song Text */}
            <div className="flex flex-col overflow-hidden max-w-[150px] md:max-w-[200px]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider leading-none">
                {isLiveMode ? "Listening on Spotify" : "Local Lofi Mix"}
              </span>
              <span className="text-xs font-bold text-zinc-300 truncate font-poppins mt-0.5 group-hover:text-primary-sky transition-colors">
                {currentTitle}
              </span>
            </div>
          </motion.div>
        ) : (
          // EXPANDED MUSIC PLAYER WIDGET
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="w-80 rounded-2xl border border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col relative"
          >
            {/* Ambient Background Glow */}
            <div 
              className={`absolute top-[-30px] left-[-30px] w-48 h-48 rounded-full blur-3xl opacity-20 -z-10 transition-colors duration-500 pointer-events-none ${
                isLiveMode ? "bg-emerald-500" : "bg-primary-sky"
              }`} 
            />

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900/60">
              <div className="flex items-center gap-1.5">
                {isLiveMode ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      Spotify Live
                    </span>
                  </>
                ) : (
                  <>
                    <Radio className="w-3.5 h-3.5 text-primary-sky animate-pulse" />
                    <span className="text-[10px] font-mono text-primary-sky font-bold uppercase tracking-widest">
                      Lofi Player
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                {isConfigured && (
                  <button
                    onClick={() => {
                      setIsLiveMode(!isLiveMode);
                      if (isLiveMode) {
                        setLocalPlaying(false);
                      }
                    }}
                    title={isLiveMode ? "Switch to Local Lofi Mixer" : "Switch to Live Spotify Sync"}
                    className={`p-1.5 rounded-lg border transition-all text-xs font-mono font-semibold ${
                      isLiveMode 
                        ? "bg-emerald-950/40 border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/40"
                        : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Sync
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Player Content */}
            <div className="p-5 flex flex-col items-center gap-4">
              {/* Spinning CD Artwork */}
              <div className="relative group/vinyl select-none">
                {/* Outer Glow ring */}
                <div 
                  className={`absolute inset-0 rounded-full blur-md opacity-30 transition-all duration-500 scale-105 ${
                    isMusicActive 
                      ? isLiveMode ? "bg-emerald-500" : "bg-primary-sky" 
                      : "bg-transparent"
                  }`} 
                />
                
                {/* Vinyl Body */}
                <div 
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-zinc-850 via-zinc-950 to-zinc-900 border-4 border-zinc-900 shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover/vinyl:scale-105"
                  style={{
                    animation: "spin 8s linear infinite",
                    animationPlayState: isMusicActive ? "running" : "paused"
                  }}
                >
                  {/* Concentric grooved lines */}
                  <div className="absolute inset-2 border border-zinc-800/30 rounded-full" />
                  <div className="absolute inset-4 border border-zinc-850/50 rounded-full" />
                  <div className="absolute inset-6 border border-zinc-900/60 rounded-full" />
                  <div className="absolute inset-8 border border-zinc-850/30 rounded-full" />

                  {/* CD Cover Image */}
                  <img
                    src={currentCover}
                    alt={currentTitle}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300";
                    }}
                    className="w-14 h-14 rounded-full object-cover border-2 border-zinc-950 z-10 select-none pointer-events-none"
                  />
                  {/* Small Spindle Center Hole */}
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-800 z-20 absolute" />
                </div>
              </div>

              {/* Title & Artist */}
              <div className="w-full text-center flex flex-col gap-0.5 overflow-hidden">
                <span className="font-poppins text-sm font-bold text-zinc-200 truncate px-2 select-text">
                  {currentTitle}
                </span>
                <span className="font-mono text-[11px] text-zinc-500 truncate px-4 select-text">
                  {currentArtist}
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="w-full flex flex-col gap-1.5 mt-1">
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className={`w-full h-1 bg-zinc-900 rounded-full overflow-hidden relative ${
                    isLiveMode ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  {/* Glowing progress bar */}
                  <div
                    className={`h-full transition-all duration-100 ${
                      isLiveMode ? "bg-emerald-500" : "bg-primary-sky"
                    }`}
                    style={{ width: `${percentProgress}%` }}
                  />
                </div>
                {/* Timeline digits */}
                <div className="w-full flex justify-between font-mono text-[9px] text-zinc-500 px-0.5">
                  <span>{currentProgressStr}</span>
                  <span>{currentDurationStr}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-6 mt-1 w-full relative">
                {/* Playlist button (Left side) */}
                <button
                  onClick={() => setPlaylistOpen(!playlistOpen)}
                  disabled={isLiveMode}
                  title="Toggle Playlist"
                  className={`absolute left-0 p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 transition-all ${
                    playlistOpen ? "text-primary-sky bg-zinc-900/50" : ""
                  } disabled:opacity-30 disabled:pointer-events-none`}
                >
                  <ListMusic className="w-4 h-4" />
                </button>

                {/* Back Button */}
                <button
                  onClick={handlePrev}
                  disabled={isLiveMode}
                  className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-35 transition-colors"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  disabled={isLiveMode}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-md hover:scale-105 active:scale-95 transition-all ${
                    isMusicActive
                      ? "bg-zinc-900 border-zinc-800 text-zinc-200"
                      : isLiveMode
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-primary-sky/10 border-primary-sky/30 text-primary-sky"
                  } disabled:cursor-default disabled:hover:scale-100`}
                >
                  {isMusicActive ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={isLiveMode}
                  className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-35 transition-colors"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>

                {/* Spotify external link (Right side) */}
                {isLiveMode && liveTrack.songUrl ? (
                  <a
                    href={liveTrack.songUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Open in Spotify"
                    className="absolute right-0 p-1.5 rounded-lg text-emerald-500 hover:text-emerald-400 hover:bg-emerald-950/20 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  // Local Volume Controls (Right side for local mode)
                  <div className="absolute right-0 flex items-center gap-1 group/volume">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-500" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    {/* Volume Slider Drawer */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const newVol = parseFloat(e.target.value);
                        setVolume(newVol);
                        if (isMuted && newVol > 0) setIsMuted(false);
                      }}
                      className="w-0 scale-x-0 origin-right group-hover/volume:w-12 group-hover/volume:scale-x-100 transition-all duration-300 cursor-pointer h-1 rounded-lg accent-primary-sky bg-zinc-800"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* CURATED PLAYLIST DRAWER */}
            <AnimatePresence>
              {playlistOpen && !isLiveMode && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="border-t border-zinc-900/60 overflow-hidden bg-zinc-950/95"
                >
                  <div className="max-h-48 overflow-y-auto no-scrollbar p-3 space-y-1.5">
                    <div className="text-[9px] font-mono text-zinc-500 px-2 uppercase tracking-widest pb-1 border-b border-zinc-900/40">
                      Curated Lofi Tracks
                    </div>
                    {curatedTracks.map((track, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectTrack(idx)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                          currentTrackIndex === idx
                            ? "bg-primary-sky/10 text-primary-sky border border-primary-sky/20"
                            : "hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img
                            src={track.coverUrl}
                            alt=""
                            className="w-7 h-7 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-xs font-bold truncate leading-tight">
                              {track.title}
                            </span>
                            <span className="text-[9px] font-mono opacity-60 truncate">
                              {track.artist}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] flex-shrink-0 ml-2">
                          {currentTrackIndex === idx && localPlaying ? (
                            // Animated Visualizer Bars (Micro version)
                            <div className="flex items-end gap-0.5 h-2 w-3.5 justify-end">
                              {[...Array(3)].map((_, i) => (
                                <span
                                  key={i}
                                  className="w-0.5 bg-primary-sky rounded-full animate-bounce"
                                  style={{
                                    animationDuration: `${0.5 + i * 0.1}s`,
                                    height: "100%",
                                  }}
                                />
                              ))}
                            </div>
                          ) : (
                            track.duration
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Rotation helper inside page */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
