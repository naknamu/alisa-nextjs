import Link from "next/link"

export default function ProfileBtn({ uploaderName }) {
  return (
    <div>
      <Link href={`/uploader/${uploaderName}`} className="btn_primary">My Profile</Link>
    </div>
  )
}
