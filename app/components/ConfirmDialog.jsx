import style from "./ConfirmDialog.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function ConfirmDialog({ setIsDialog, image }) {
  const router = useRouter();
  const { data } = useSession();
  const auth_token = getCookie("auth_token");

  const handleDeleteImage = async () => {
    // Call Delete image API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/image/${image._id}/delete`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      },
    );

    if (res.status === 200) {
      router.push(`/uploader/${data.user.name}`);
      router.refresh();
    }
  };

  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <b>Are you sure you want to delete this image?</b>
        <span className={style.btngroup}>
          <button className="btn_primary" onClick={() => handleDeleteImage()}>
            Confirm
          </button>
          <button className="btn_primary" onClick={() => setIsDialog(false)}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}
