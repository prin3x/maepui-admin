import CheckBoxField from "../InputFields/CheckBoxField";

const OptionsTab = () => {
  return (
    <>
      <CheckBoxField name="status" helpertext="*Toggle between Enabled and Disabled to control the availability of the product for purchase." />
    </>
  );
};

export default OptionsTab;
