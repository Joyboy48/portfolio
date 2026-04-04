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
  import Image from "next/image";

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
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg"
            alt="LeetCode"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        ),
      },
      {
        name: "Medium",
        link: portfolioConfig.socialLinks.medium,
        icon: (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
          >
            <path d="M4.75 7.5A1.75 1.75 0 0 0 3 9.25v5.5A1.75 1.75 0 0 0 4.75 16.5a1.75 1.75 0 0 0 1.75-1.75v-5.5A1.75 1.75 0 0 0 4.75 7.5Zm7.25.25a4.25 4.25 0 0 0-4.25 4.25v.5A4.25 4.25 0 0 0 12 16.75a4.25 4.25 0 0 0 4.25-4.25V12A4.25 4.25 0 0 0 12 7.75Zm8 .25a.75.75 0 0 0-.75.75v6.5a.75.75 0 0 0 1.5 0v-6.5a.75.75 0 0 0-.75-.75Z" />
          </svg>
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
