import { Oval } from "react-loader-spinner";

export default function LoaderUI() {
  return (
    <Oval
      visible={true}
      height="30"
      width="30"
      color="#8a2be2"
      secondaryColor="8a2be2"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
