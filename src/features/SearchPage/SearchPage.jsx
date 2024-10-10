import { useState } from "react";
import CalendarSearch from "./_components/CalendarSearch";
import RegionSearch from "./_components/RegionSearch";
import KeywordSearch from "./_components/KeywordSearch";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import useFestivalSearchStore from "../../store/festivalSearchStore";
import useFestivalRegionStore from "../../store/festivalRegionStore";
import { getKeywordSearchResults } from "../../network/FestivalApi";

const steps = ["날짜", "지역", "키워드"];

const SearchPage = () => {
  const navigate = useNavigate();
  const [skipped, setSkipped] = useState(new Set());

  const {
    setDateRange,
    activeStep,
    setActiveStep,
    setKeywordResult,
    inputKeyword,
  } = useFestivalSearchStore();
  const { setSelectedRegion } = useFestivalRegionStore();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    setActiveStep(activeStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const fetchKeyword = async (inputKeyword) => {
    try {
      const keywordResult = await getKeywordSearchResults(inputKeyword);

      setKeywordResult(keywordResult);
    } catch (e) {
      console.error("키워드 검색 실패", e);
    }
  };

  const handleSubmit = async () => {
    if (inputKeyword.trim()) {
      try {
        await fetchKeyword(inputKeyword);
      } catch (e) {
        console.error("키워드 검색 실패", e);
      }
    }
    navigate("/searchResult");
  };

  return (
    <div className="pt-16">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel
                  icon={
                    <span
                      className={`text-[12px] font-bold rounded-full px-3 py-2 ${
                        activeStep === index
                          ? "bg-orange-500 text-white"
                          : "bg-transparent text-black"
                      }`}
                    >
                      {label}
                    </span>
                  }
                  sx={{
                    "& .MuiStepLabel-label": {
                      color: "white",
                    },
                    "& .Mui-completed .MuiStepLabel-label": {
                      color: "white",
                    },
                    "& .Mui-active .MuiStepLabel-label": {
                      color: "white",
                    },
                  }}
                />
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 && (
          <div className="flex flex-col pt-14 pb-[4.6rem]">
            <CalendarSearch
              onSelect={(date) => {
                setDateRange(date);
                handleNext();
              }}
            />
            <div className="w-full m-auto flex justify-end pb-8 px-4 pt-4">
              <button
                onClick={handleSkip}
                className="w-18 h-7 bg-iconActive text-white text-[12px] py-1 px-2 rounded-md shadow-md hover:bg-orange-600 transition-colors"
              >
                건너뛰기
              </button>
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col pt-4">
            <RegionSearch
              onSelect={(region) => {
                setSelectedRegion(region);
                handleNext();
              }}
            />
            <div className="w-full m-auto flex justify-between pb-24 px-4">
              <button
                onClick={handleBack}
                className="w-16 h-7 bg-prevBtn text-white text-[12px] py-1 rounded-md shadow-md hover:bg-[#9e9e9e] transition-colors"
              >
                이전
              </button>
              <button
                onClick={handleSkip}
                className="w-18 h-7 bg-iconActive text-white text-[12px] py-1 px-2 rounded-md shadow-md hover:bg-orange-600 transition-colors"
              >
                건너뛰기
              </button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="flex flex-col pt-12">
            <KeywordSearch
              onChange={(value) => {
                setKeywordResult(value);
              }}
            />
            <div className="w-full m-auto flex justify-between pb-24 px-4">
              <button
                onClick={handleBack}
                className="w-16 h-7 bg-prevBtn text-white text-[12px] py-1 rounded-md shadow-md hover:bg-[#9e9e9e] transition-colors"
              >
                이전
              </button>
              <button
                onClick={handleSubmit}
                className="w-16 h-7 bg-iconActive text-white text-[12px] py-1 rounded-md shadow-md hover:bg-orange-600 transition-colors"
              >
                검색
              </button>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SearchPage;
