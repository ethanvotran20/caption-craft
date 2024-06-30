import SparklesIcon from "./sparkles icon";

export default function DemoSection() {
    return (
        <section className="flex justify-around mt-16 items-center">
        <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl">
        </div>
        <div>
          <SparklesIcon />
        </div>
        <div className="bg-gray-800/50 w-[240px] h-[480px] rounded-xl">
        </div>
      </section>
    );
}
