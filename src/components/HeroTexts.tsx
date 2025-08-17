import TextRotator from "./TextRotator";
import { portfolioConfig } from "@/config/portfolio.config";

const HeroTexts = () => {
  const nameParts = portfolioConfig.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const middleNames = nameParts.slice(1, -1).join(" "); // works for any number of middle names

  return (
    <div className="flex flex-col items-start justify-center text-left">
      <h3 className="font-poppins text-2xl max-sm:text-xl">My Name is</h3>
      <h1 className="font-rubik text-8xl name_underline text-primary max-sm:text-6xl whitespace-pre-wrap">
        {firstName} {middleNames} <br /> {lastName} .
      </h1>
      <TextRotator />
    </div>
  );
};

export default HeroTexts;
