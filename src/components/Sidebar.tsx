import { List, X } from "phosphor-react";
import { useState } from "react";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

export function Sidebar() {
  const { data } = useGetLessonsQuery();
  const [menuVisible, setMenuVisible] = useState(true);

  return (
    <aside
      onClick={() => setMenuVisible(!menuVisible)}
      className="
      md:w-[348px]
      bg-gray-700 p-6 border-l border-gray-600
      "
    >
      <button className="fixed mr-2 top-5 right-8 text-white md:hidden md:opacity-0 ease-in-out duration-300">
        {menuVisible ? <X size={32} /> : <List size={32} />}
      </button>
      {menuVisible ? (
        <>
          <span className="text-bold text-2xl pb-6 mb-6 border-b border-gray-500 md:block flex justify-center">
            Cronograma das aulas
          </span>
          <div className="flex flex-col gap-8">
            {data?.lessons.map((lesson) => {
              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  slug={lesson.slug}
                  availableAt={new Date(lesson.availableAt)}
                  type={lesson.lessonType}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>
          <span className="md:text-bold md:text-2xl md:pb-6 md:mb-6 md:border-b md:border-gray-500 md:block hidden">
            Cronograma das aulas
          </span>
          <div className="md:flex md:flex-col md:gap-8 hidden">
            {data?.lessons.map((lesson) => {
              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  slug={lesson.slug}
                  availableAt={new Date(lesson.availableAt)}
                  type={lesson.lessonType}
                />
              );
            })}
          </div>
        </>
      )}
    </aside>
  );
}
