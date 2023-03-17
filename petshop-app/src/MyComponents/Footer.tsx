import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple
} from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import "./footerStyle.css";

export const Footer = () => {

  const { t } = useTranslation(['home', 'main']);
  return (
    <Box sx={{ paddingTop: 1}}>
      <div className="footer">
        <div>
          <div className="footer-content">
            <h3
              style={{
                fontFamily: "Trebuchet MS",
                fontSize: "2em"
              }}
            >
              {t("footerPetstore", { ns: ["home","main"]})}
            </h3>
            <p>{t("footerLine1", { ns: ["home","main"]})}</p>
            <div className="sub">
              <div>
                <b>{t("footerLine2", { ns: ["home","main"]})}</b>
                <p>{t("footerLine3", { ns: ["home","main"]})}</p>
                <p>{t("footerLine4", { ns: ["home","main"]})}</p>
              </div>
              <div>
                <b>{t("footerLine5", { ns: ["home","main"]})}</b>
                <p>{t("footerLine6", { ns: ["home","main"]})}</p>
                <p>{t("footerLine7", { ns: ["home","main"]})}</p>
              </div>
              <div>
                <b>{t("footerLine8", { ns: ["home","main"]})}</b>
                <p>{t("footerLine9", { ns: ["home","main"]})}</p>
                <p>{t("footerLine10", { ns: ["home","main"]})}</p>
              </div>
              <div>
                <b>{t("footerLine11", { ns: ["home","main"]})}</b>
                <p>{t("footerLine12", { ns: ["home","main"]})}</p>
                <p>{t("footerLine13", { ns: ["home","main"]})}</p>
                <p>{t("footerLine14", { ns: ["home","main"]})}</p>
              </div>
              <div>
                <b>{t("footerLine15", { ns: ["home","main"]})}</b>
                <div>
                  <AiFillFacebook />
                  <AiFillTwitterCircle />
                  <AiFillInstagram />
                </div>
                <div>
                  <AiFillApple />
                  <FaGooglePlay />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};


