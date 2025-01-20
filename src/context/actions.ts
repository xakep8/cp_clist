import { API_ENDPOINT, API_KEY, API_USERNAME } from "../config";
import { EventData } from "../types";

export async function getData(){
    const today=new Date().toISOString().split('T')[0];
    const url = encodeURI(`${API_ENDPOINT}/api/v4/contest/?limit=50&start__gt=${today}&order_by=start`);
    const auth = `ApiKey ${API_USERNAME}:${API_KEY}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: auth
        },
    }).then(
        async (res) => {
            const data = await res.json();
            return data.objects;
        }
    ).catch((err) => {
        console.error(err);
    });
    return response;
}


export async function fetchData(){
  var todayStart = new Date();
  todayStart.setHours(0, 0, 0);
  const timeStamp = localStorage.getItem("timeStamp");
  const TS = timeStamp ? new Date(timeStamp) : new Date(0);
  var returnData: EventData[] | null = [];
  if (localStorage.getItem("contests") === null || TS < todayStart) {
    const data = await getData();
    var filteredData: EventData[] = [];
    if (data === null) {
      throw new Error("Data is null");
    }
    else {
      filteredData = data.filter((items: EventData) => {
        return items.resource === "codeforces.com" || items.resource === "atcoder.jp" || items.resource === "codechef.com" || items.resource === "leetcode.com";
      });
      localStorage.setItem("contests", JSON.stringify(filteredData));
      localStorage.setItem("timeStamp", todayStart.toISOString());
      returnData=filteredData;
    }
  } else {
    const contests = localStorage.getItem("contests");
    if (contests) {
      const apiData = JSON.parse(contests);
      returnData = apiData;
    }
  }
  return(returnData);
}

export function handleClick(data: EventData[] | null, setData: React.Dispatch<React.SetStateAction<EventData[] | null>>) {
  const newData = data?.filter((items: EventData) => {
    const start = new Date(items.start);
    start.setHours(start.getHours() + 5);
    start.setMinutes(start.getMinutes() + 30);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0);
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(todayStart.getDate() + 1);
    return start >= todayStart && start < tomorrowStart;
  });
  if (newData) {
    setData(newData);
  }
}

export async function filterResource(resource: string[], setData: React.Dispatch<React.SetStateAction<EventData[] | null>>) {
  const data: EventData[] | null = await fetchData();
  const newData = data?.filter((item: EventData) => {
    return resource.includes(item.resource);
  });
  if (newData) {
    setData(newData);
  }
}