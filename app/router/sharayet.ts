import fs from "fs"; // استفاده از ماژول fs با تایپ‌های Node.js

// تعریف تایپ‌ها برای داده‌ها و مدل‌ها
type MessageData = {
  message: string;
};

type StreamerData = {
  [key: number]: MessageData;
};

type StreamersData = {
  [key: string]: StreamerData;
};

// تعریف شیء دیکشنری چند لایه‌ای برای ذخیره اطلاعات استریمرها
let streamersData: StreamersData = {
  KiaN: {
    7000: {
      message: "سلام",
    },
    15000: {
      message: "خوبی",
    },
  },
};

// تابعی برای ذخیره اطلاعات در فایل JSON
function saveToJsonFile(data: any, fileName: string) {
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(fileName, jsonData, (err) => {
    if (err) {
      console.error("خطا در ذخیره فایل JSON:", err);
      return;
    }
    console.log(`فایل ${fileName} با موفقیت ذخیره شد.`);
  });
}

// تابعی برای خواندن اطلاعات از فایل JSON
function loadFromJsonFile(fileName: string): any {
  try {
    const jsonData = fs.readFileSync(fileName, "utf8");
    const data = JSON.parse(jsonData);
    return data;
  } catch (err) {
    console.error("خطا در خواندن فایل JSON:", err);
    return null;
  }
}

// فراخوانی تابع برای خواندن اطلاعات از فایل
const loadedData = loadFromJsonFile("streamers.json");
if (loadedData !== null) {
  streamersData = loadedData;
}

// مثال برای چک کردن مقدار amount در بازه‌ها و نمایش پیام مناسب
const streamerName = "KiaN";
const amount = 18000;

if (streamersData[streamerName]) {
  let message = "";

  for (const value in streamersData[streamerName]) {
    if (amount >= parseInt(value)) {
      message = streamersData[streamerName][parseInt(value)].message;
    } else {
      break;
    }
  }

  if (message) {
    console.log(`${streamerName} می‌گوید: ${message}`);
  } else {
    console.log(`برای ${streamerName} پیامی برای مقدار ${amount} یافت نشد.`);
  }
} else {
  console.log(`استریمر با نام ${streamerName} یافت نشد.`);
}

// فراخوانی تابع برای ذخیره اطلاعات در فایل
saveToJsonFile(streamersData, "streamers.json");
