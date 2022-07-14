import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  slug: string;
  title: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE ' • ' d ' de ' MMMM ' • ' k'h'mm",
    {
      locale: ptBR,
    }
  );

  const isActiveLesson = slug === props.slug;

  return (
    <Link
      to={`/event/lesson/${props.slug}`}
      target="_self"
      className={`group ${
        isLessonAvailable ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <span className="text-gray-300">{availableDateFormatted}</span>
      <div
        className={`rounded border border-gray-500 p-4 mt-2  ${
          isActiveLesson
            ? "bg-green-500 group-hover:border-white"
            : "group-hover:border-green-500"
        }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={`flex items-center gap-2 text-sm font-medium ${
                isActiveLesson ? "text-white" : "text-blue-500"
              }`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={`text-xs rounded px-2 py-[0.124rem] text-white border  ${
              isLessonAvailable
                ? isActiveLesson
                  ? "border-white"
                  : "border-green-500 group-hover:text-green-500"
                : "border-orange-500"
            }  font-bold `}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={`mt-5 block ${
            isActiveLesson ? "text-white" : "text-gray-200"
          }`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
