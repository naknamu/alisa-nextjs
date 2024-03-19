import { ThreeDots } from "react-loader-spinner";

export default function LoaderUI() {
  return (
    <ThreeDots
      visible={true}
      height="30"
      width="30"
      color="#8a2be2"
      radius="3"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
