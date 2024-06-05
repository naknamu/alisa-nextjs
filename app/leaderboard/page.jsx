"use client";

import React, { useEffect, useState } from "react";
import { getImages } from "../actions";
import styles from "./page.module.css";

export default function Page() {
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const images = await getImages();

      // Count images per uploader
      const uploaderCount = images.reduce((acc, image) => {
        const username = image.uploader.username;
        if (!acc[username]) {
          acc[username] = 0;
        }
        acc[username] += 1;
        return acc;
      }, {});

      // Convert the object to an array and sort by count
      const sortedUploaders = Object.entries(uploaderCount)
        .map(([username, count]) => ({ username, count }))
        .sort((a, b) => b.count - a.count);

      setLeaderboard(sortedUploaders);
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.container}>
        <h1>Leaderboard</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Rank</th>
              <th className={styles.th}>Uploader</th>
              <th className={styles.th}>Image Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((uploader, index) => (
              <tr key={index}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{uploader.username}</td>
                <td className={styles.td}>{uploader.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
