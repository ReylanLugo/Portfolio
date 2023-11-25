import { FaCheck } from "react-icons/fa";
import Button, { ButtonProps } from "../../atoms/Button";
import { CardWithGlow } from "../../atoms/CardWithGlow";

type pricingDetails = {
    title: string;
    glowColor: "red" | "green" | "blue";
    price: number;
    description: string;
    features: string[];
    buttonText: string;
    buttonColor: ButtonProps["color"];
    buttonVariant: ButtonProps["type"];
}


const pricingDetails: pricingDetails[] = [
    {
        title: "Mini",
        glowColor: "blue",
        price: 100,
        description: "Landing page: 3 sections + footer",
        features: ["1 page/screen", "UI/UX design", "Include source files", "7 days free support"],
        buttonColor: "white",
        buttonText: "Get started",
        buttonVariant: "outline",
    },
    {
        title: "Standard",
        glowColor: "red",
        price: 299,
        description: "Landing page: 5 sections + footer 2 inner pages",
        features: ["3 page/screen", "UI/UX design", "Include source files", "Prototype", "14 days free support"],
        buttonColor: "lightblue",
        buttonText: "Get started",
        buttonVariant: "fill",
    },
    {
        title: "Premium",
        glowColor: "green",
        price: 499,
        description: "Landing page: 5 sections + footer floating number of inner pages",
        features: ["5 page/screen", "UI/UX design", "Include source files", "Prototype", "21 days free support"],
        buttonColor: "red",
        buttonText: "Get started",
        buttonVariant: "outline",
    }
]

export const PricingCards = () => {
  return (
    <>
      {pricingDetails.map((card, index) => (
        <CardWithGlow key={index} colorGlow={card.glowColor}>
          <h3 className="text-indigo-400 block mb-4">{card.title}</h3>
          <label className="text-5xl font-bold font-mono">
            ${card.price}
            <p className={`text-xs font-sans font-normal text-gray-400 border-b-2 border-slate-700 ${card.title === "Mini" ? "pb-7" : "pb-3"}`}>
              {card.description}
            </p>
          </label>
          <ul className="mt-4 text-sm">
            {card.features.map((feature, index) => (
              <li key={index} className="flex items-center mb-3">
                <span className="text-green-500 mr-2">
                  <FaCheck />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            color={card.buttonColor}
            type={card.buttonVariant}
            className={`${card.title === "Mini" ? "mt-12" : "mt-4"} py-3 px-5 w-full ${card.buttonVariant === "outline" && "ring-1 -white"} `}
          >
            {card.buttonText}
          </Button>
        </CardWithGlow>
      ))}
    </>
  );
};
