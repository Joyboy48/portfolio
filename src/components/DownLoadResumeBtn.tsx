"use client";
import { cn } from '@/lib/utils'
import { Download, Eye, X } from 'lucide-react'
import React, { useState } from 'react'
import { buttonVariants } from './ui/button'
import HackerBtn from './animation/HackerBtn'

function DownLoadResumeBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-fit w-full mt-2 py-2 px-4 flex flex-wrap gap-4 items-center">
      <a href="/new resume 4.pdf" target="_blank" rel="noopener noreferrer" download>
        <HackerBtn label='Download Resume' />
      </a>
      
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "h-11 transition-all hover:bg-primary-sky/15 hover:border-primary-sky hover:text-primary-sky flex items-center gap-2 border-2"
        )}
      >
        <Eye className="h-5 w-5" />
        View Resume
      </button>

      {/* In-Browser PDF Resume Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border-2 border-zinc-800 rounded-xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl relative">
            {/* Modal Header */}
            <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
              <span className="font-mono text-sm text-zinc-300">resume_astitva_arya.pdf</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors p-1 rounded-lg hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* PDF Viewer Iframe */}
            <div className="flex-grow w-full bg-zinc-900">
              <iframe
                src="/new resume 4.pdf#toolbar=0"
                className="w-full h-full border-none"
                title="Astitva Arya Resume"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DownLoadResumeBtn;
