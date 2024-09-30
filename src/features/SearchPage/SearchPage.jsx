import { useState } from "react";
import CalendarSearch from "./_components/CalendarSearch";
import RegionSearch from "./_components/RegionSearch";
import KeywordSearch from "./_components/KeywordSearch";
// import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["날짜", "지역", "키워드"];

const SearchPage = () => {
  // const navigate = useNavigate();

  // 단계 상태 관리 (0: 날짜, 1: 지역, 2: 키워드)
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);
  const handleSubmit = () => {
    // navigate(`/search/${}`)
  };

  return (
    <>
      <div className="mt-16">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {step === 0 && (
          <div className="flex flex-col mt-4">
            <CalendarSearch />
            <div className="w-[350px] m-auto flex justify-end mt-6">
              <button
                onClick={handleNextStep}
                className="w-16 h-7 bg-iconActive text-white text-[12px] py-1 rounded-md shadow-md hover:bg-orange-700 transition-colors"
              >
                건너뛰기
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col mt-4">
            <RegionSearch onSelect={(region) => setSelectedRegion(region)} />
            <div className="w-full m-auto flex justify-between pb-24 px-4">
              <button
                onClick={handlePrevStep}
                className="w-16 h-7 bg-prevBtn text-white text-[12px] py-1 rounded-md shadow-md hover:bg-[#9e9e9e] transition-colors"
              >
                이전
              </button>
              <button
                onClick={handleNextStep}
                className="w-16 h-7 bg-iconActive text-white text-[12px] py-1 rounded-md shadow-md hover:bg-orange-700 transition-colors"
              >
                건너뛰기
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col mt-4">
            <KeywordSearch onChange={(value) => setKeyword(value)} />
            <div className="w-full m-auto flex justify-between pb-24 px-4">
              <button
                onClick={handlePrevStep}
                className="w-16 h-7 bg-prevBtn text-white text-[12px] py-1 rounded-md shadow-md hover:bg-[#9e9e9e] transition-colors"
              >
                이전
              </button>
              <button
                onClick={handleSubmit}
                className="w-16 h-7 bg-iconActive text-white text-[12px] py-1 rounded-md shadow-md hover:bg-orange-700 transition-colors"
              >
                검색
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
