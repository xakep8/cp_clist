import { EventData } from "../types";


interface CardProps {
    item: EventData;
    date: string;
    time: string;
    durationHours: number;
    durationMinutes: number;
}


export default function Cards({ item, date, time, durationHours, durationMinutes }: CardProps) {
    return (
        <a href={item.href} target='_blank' rel='noreferrer' className='flex flex-col w-full bg-[#40434E] px-4 py-2 my-2 rounded-md'>
            <div className='flex flex-col w-full m-2 text-left max-w-md text-white'>
                <p className='font-bold'>{item.event.includes("Beginner") ? 'AtCoder Beginner Contest' : item.event}</p>
                <p>Date: {date}</p>
                <p>Time: {time}</p>
                <p>Duration: {durationHours} hours {durationMinutes} minutes</p>
            </div>
        </a>
    );
}