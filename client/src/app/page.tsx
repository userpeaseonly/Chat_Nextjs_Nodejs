"use client";
import carIcon from "@/images/directions_car_24dp_B87E9F_FILL0_wght400_GRAD0_opsz24.png";
import techIcon from "@/images/biotech_24dp_B87E9F_FILL0_wght400_GRAD0_opsz24.png";
import sportIcon from "@/images/fitness_center_24dp_B87E9F_FILL0_wght400_GRAD0_opsz24.png";
import fashionIcon from "@/images/styler_24dp_B87E9F_FILL0_wght400_GRAD0_opsz24.png";
import cryptoIcon from "@/images/currency_bitcoin_24dp_B87E9F_FILL0_wght400_GRAD0_opsz24.png";
import marketIcon from "@/images/add_business_24dp_B87E9F_FILL0_wght400_GRAD0_opsz24.png";
import othersIcon from "@/images/other_admission_24dp_B87E9F_FILL0_wght400_GRAD0_opsz24.png";
import errorIcon from "@/images/error.png";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

type btnsType = {
  name: string;
  icon: StaticImageData;
};

const btns: btnsType[] = [
  {
    name: "Cars",
    icon: carIcon,
  },
  {
    name: "Technology",
    icon: techIcon,
  },
  {
    name: "Sport",
    icon: sportIcon,
  },
  {
    name: "Fashion",
    icon: fashionIcon,
  },
  {
    name: "Crypto",
    icon: cryptoIcon,
  },
  {
    name: "Market",
    icon: marketIcon,
  },
  {
    name: "Others",
    icon: othersIcon,
  },
];

export default function Home() {
  const [activeBtn, setActiveBtn] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const userEmailVal = useDebounce(userEmail);

  const router = useRouter();

  const btnHandler = (btnName: string) => {
    setActiveBtn(btnName);
  };

  useEffect(() => {
    if (!userEmailVal || !activeBtn || emailError) {
      setBtnDisabled(true);
      return;
    }
    setBtnDisabled(false);
  }, [userEmailVal, activeBtn, emailError]);

  useEffect(() => {
    if (userEmailVal) {
      const testEmail = /^\w+@[a-z]{4,5}\.[a-z]{2,}$/;
      if (!testEmail.test(userEmailVal)) {
        setEmailError("invalid email, please try again!!");
        return;
      }
    }
    setEmailError("");
  }, [userEmailVal]);

  const joinBtnHandler = () => {
    router.push(`/roomchat?userEmail=${userEmail}&chatRoom=${activeBtn}`);
  };

  return (
    <div className="grid place-items-center h-dvh">
      <header className="border-2 w-96 rounded-lg p-4 flex flex-col gap-9">
        <h1 className="text-center text-4xl font-bold">Chat App</h1>
        <div className="relative">
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            type="text"
            placeholder="Please enter your email"
            className={` ${
              emailError && "border-red-500"
            } border-2 w-full p-2 rounded-lg outline-none`}
          />
          {emailError && (
            <div className="flex gap-1  absolute bottom-[-26px]">
              <Image src={errorIcon} width={25} height={20} alt="error icon" />
              <span className="text-red-500 ">{emailError}</span>
            </div>
          )}
        </div>

        <div>
          <p>
            Please choose on of the topics below that you want to discuss
            about...
          </p>
          <ul className="flex flex-wrap gap-4">
            {btns.map((btn, i) => (
              <li
                onClick={() => btnHandler(btn.name)}
                key={i}
                className={`border-2 flex gap-3 p-1 rounded-lg hover:cursor-pointer hover:border-red-900 
                  ${activeBtn === btn.name ? "border-red-900" : ""}`}
              >
                <span className="select-none">{btn.name}</span>
                <Image src={btn.icon} alt="btn icon" width={25} height={25} />
              </li>
            ))}
          </ul>
        </div>

        <button
          disabled={btnDisabled}
          onClick={joinBtnHandler}
          className={`${
            btnDisabled
              ? "text-gray-400 hover:cursor-not-allowed"
              : "hover:cursor-pointer border-green-500 text-green-700"
          }     border-2 p-2 rounded-lg text-2xl`}
        >
          Join In
        </button>
      </header>
    </div>
  );
}
