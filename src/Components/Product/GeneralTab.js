import React, { useContext } from "react";
import SimpleInputField from "../InputFields/SimpleInputField";
import DescriptionInput from "./DescriptionInput";
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";

const GeneralTab = ({ values, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <>
      <SimpleInputField nameList={[{ name: "name", require: "true", placeholder: t("EnterName") }, { name: "short_description", require: "true", title: "ShortDescription", type: "textarea", rows: 3, placeholder: t("EnterShortDescription"), helpertext: "*Maximum length should be 300 characters." }]} />
      <DescriptionInput values={values} setFieldValue={setFieldValue} title={t('Description')} nameKey="description" errorMessage={"Descriptionisrequired"} />
    </>
  );
};

export default GeneralTab;
