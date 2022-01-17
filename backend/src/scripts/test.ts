import md5File from "md5-file";

const audioFile = process.env.AUDIO_FILE || "";

(async () => {
  const checksum = await md5File(audioFile);
  console.log(checksum);
})();
