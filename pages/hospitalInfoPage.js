import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { useRouter } from "next/router";
import React from "react";
import FeedbackForm from "../components/FeedbackForm";
import Footer from "../components/Footer";
import GetHead from "../components/head";
import Header from "../components/Header";
import HospitalInfos from "../components/HospitalInfos";
import muiTheme from "../styles/muiTheme";

function HospitalInfoPage({
  handleLanguage,
  handleLanguageClick,
  minLandscape,
  page,
  handlePage,
  handleInformationSource,
  minFooterText,
}) {
  const router = useRouter();
  // console.log("HospitalInfoPage");
  // console.log(JSON.parse(router.query.hospitalInfo));
  const hospitalInfo = JSON.parse(router.query.hospitalInfo);
  const language = router.query.language;

  console.log(language);

  return (
    <React.StrictMode>
      <GetHead />
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Header
          language={language}
          handleLanguage={handleLanguage}
          handleLanguageClick={handleLanguageClick}
          minLandscape={minLandscape}
          page={page}
          handleHospitalInfoClick={handlePage}
        />
        <HospitalInfos hospitalInfo={hospitalInfo} language={language} />
        <FeedbackForm hospitalInfo={hospitalInfo} language={language} />
        <Footer
          language={language}
          handleInformationSource={handleInformationSource}
          minFooterText={minFooterText}
        />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default HospitalInfoPage;
