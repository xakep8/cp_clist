import { EventData } from "../types";
import Cards from "./cards";


export default function CardSection({ data }: { data: EventData[] | null }) {
    return (
        <div className='flex flex-col w-full'>
            {data?.map((item: EventData, idx: number) => {
                const start = new Date(item.start);
                start.setHours(start.getHours() + 5);
                start.setMinutes(start.getMinutes() + 30);
                const date = `${start.getDate().toString().padStart(2, '0')}/${(start.getMonth() + 1).toString().padStart(2, '0')}/${start.getFullYear()}`;
                const time = start.toLocaleTimeString();
                const durationHours = Math.floor(item.duration / 60 / 60);
                const durationMinutes = Math.floor((item.duration / 60) % 60);
                return (
                    <Cards key={idx} date={date} time={time} durationHours={durationHours} durationMinutes={durationMinutes} item={item} />
                )
            })}
        </div>
    );
}