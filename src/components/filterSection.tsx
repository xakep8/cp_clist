export default function FilterSection({ resource, setResource }: { resource: string[], setResource: React.Dispatch<React.SetStateAction<string[]>> }) {
    return (
        <div className="flex w-full items-center justify-between gap-x-5">
            <button onClick={() => setResource(resource.includes("codeforces.com")?resource.filter(item => item !== "codeforces.com"):[...resource, "codeforces.com"])} className={` px-4 py-2 my-2 rounded-md focus:outline-none ${resource.includes("codeforces.com")&&'bg-green-700'}`}>Codeforces</button>
            <button onClick={() => setResource(resource.includes("atcoder.jp")?resource.filter(item => item !== "atcoder.jp"):[...resource, "atcoder.jp"])} className={` px-4 py-2 my-2 rounded-md focus:outline-none ${resource.includes("atcoder.jp")&&'bg-green-700'}`}>AtCoder</button>
            <button onClick={() => setResource(resource.includes("leetcode.com")?resource.filter(item => item !== "leetcode.com"):[...resource, "leetcode.com"])} className={` px-4 py-2 my-2 rounded-md focus:outline-none ${resource.includes("leetcode.com")&&'bg-green-700'}`}>LeetCode</button>
            <button onClick={() => setResource(resource.includes("codechef.com")?resource.filter(item => item !== "codechef.com"):[...resource, "codechef.com"])} className={` px-4 py-2 my-2 rounded-md focus:outline-none ${resource.includes("codechef.com")&&'bg-green-700'}`}>CodeChef</button>
        </div>
    );
}