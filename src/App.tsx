import './App.css';
import { fetchData,handleClick,filterResource } from './context/actions';
import { useEffect, useState } from 'react';
import { EventData } from './types';
import github from '/github-mark-white.svg';
import CardSection from './components/cardSection';
import FilterSection from './components/filterSection';

function App() {
  const [data, setData] = useState<EventData[] | null>(null);
  const [today, setToday] = useState(false);
  const [resource, setResource] = useState<string[]>([]);
  const [filterButton, setFilterButton] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setData(await fetchData());
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (today) {
        handleClick(data, setData);
      } else {
        setData(await fetchData());
      }
    };
    fetchDataAsync();
  }, [today]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      if (resource.length > 0) {
        filterResource(resource, setData);
      } else {
        setData(await fetchData());
      }
    };
    fetchDataAsync();
  }, [resource]);

  return (
    <div className='flex flex-col w-[32rem] h-[89vh] text-white gap-x-5'>
      <div className='flex w-full justify-between'>
        <div className='flex'>
          <button className={`flex items-center justify-center text-center text-lg font-bold px-6 py-1 focus:outline-none ${today && 'bg-green-700'}`} onClick={() => setToday(!today)}>Today</button>
        </div>
        <div className='flex gap-x-2'>
          <a href='https://github.com/xakep8' target='_blank' rel='noreferrer'><button className='px-3 py-3'><img src={github} alt="GitHub" className='w-6' /></button></a>
          <button className={`flex items-center justify-center text-center px-3 py-3 focus:outline-none ${filterButton && 'bg-green-700'}`} onClick={() => setFilterButton(!filterButton)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      {filterButton && <FilterSection resource={resource} setResource={setResource} />}
      <CardSection data={data} />
    </div>
  )
}

export default App
