import { cn } from "@/lib/utils";
import {
  Linkedin,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import FramerWrapper from "./animation/FramerWrapper";
import { portfolioConfig } from "@/config/portfolio.config";

const SocialLinks = () => {
  const links = [
    {
      name: "Twitter",
      link: portfolioConfig.socialLinks.twitter,
      icon: <Twitter />,
    },
    {
      name: "Linkedin",
      link: portfolioConfig.socialLinks.linkedin,
      icon: <Linkedin />,
    },
    {
      name: "Instagram",
      link: portfolioConfig.socialLinks.instagram,
      icon: <Instagram />,
    },
    {
      name: "Github",
      link: portfolioConfig.socialLinks.github,
      icon: <Github />,
    },
    {
    name: "LeetCode",
      link: portfolioConfig.socialLinks.leetcode, // make sure to add this in portfolioConfig
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg"
          alt="LeetCode"
          className="w-5 h-5"
        />
      ),
    },
  ];
  return (
    <>
      {links.map((itm, indx) => {
        const timing = 0.55 + indx * 0.125;

        return (
          <FramerWrapper key={indx} delay={timing} y={50}>
            <Link
              target="blank"
              href={itm.link}
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" })
              )}
            >
              {itm.icon}
            </Link>
          </FramerWrapper>
        );
      })}
    </>
  );
};

export default SocialLinks;
