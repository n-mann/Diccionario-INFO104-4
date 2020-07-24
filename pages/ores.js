import { css } from "@emotion/react";
import { useState } from "react";
import { db } from "../src/api/db";
import { isEmail } from "../src/utils";

// const hoverBoxShadow = css`
//   transition: box-shadow 0.5s;
//   :hover {
//     box-shadow: 0px 0px 5px 5px #888;
//   }
// `;

export const getServerSideProps = async () => {
  const courses = (await db("courses").select("*")).map((v) => ({ ...v }));

  return {
    props: {
      courses,
    },
  };
};

const OresQuestion = ({ courses, answer, setAnswer }) => {
  const [courseSelected, setCourseSelected] = useState(courses[0]?.code);

  if (answer) {
    return (
      <button
        css={css`
          border-radius: 15px;
          padding: 10px;
          font-size: 1.3em;
          font-weight: bold;
          background-color: #79c4e3;
          color: white;
          transition: box-shadow 0.5s;
          :hover {
            box-shadow: 0px 0px 5px 5px #888;
          }
        `}
        onClick={() => {
          setAnswer(null);
        }}
      >
        Volver a preguntar
      </button>
    );
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin: 15px;
          font-weight: bold;
        `}
      >
        <span>¿Cuántas horas necesitaré para estudiar</span>
        <select
          css={css`
            margin-left: 5px;
            margin-right: 5px;
            font-size: 1em;
            transition: box-shadow 0.5s;
            :hover {
              box-shadow: 0px 0px 5px 5px #888;
            }
            font-family: "Lato", sans-serif;
          `}
          value={courseSelected}
          onChange={({ target: { value } }) => {
            setCourseSelected(value);
          }}
        >
          {courses.map(({ id, name, code, weekhours }) => {
            return (
              <option key={id} value={code}>
                ({code}) {name}
              </option>
            );
          })}
        </select>
        <span>?</span>
      </div>
      <button
        css={css`
          border-radius: 15px;
          background-color: #ee8511;
          color: white;
          font-weight: bold;
          padding: 15px;
          font-size: 1.5em;
          transition: box-shadow 0.5s;
          :hover {
            box-shadow: 0px 0px 5px 5px #888;
          }
        `}
        onClick={() => {
          setAnswer(
            courses.find((course) => {
              return course.code === courseSelected;
            })
          );
        }}
      >
        Preguntar
      </button>
    </>
  );
};

const OresSubscribe = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) return null;

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding-bottom: 25px;
      `}
    >
      <p>
        Si quieres conocer más del futuro de tus estudios, suscríbete con tu
        correo acá:
      </p>
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          const response = await fetch("/api/subscribe", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            alert("Gracias por suscribirse!");
            setSubscribed(true);
          } else {
            alert(await response.text());
          }
        }}
      >
        <input
          css={css`
            font-size: 1.1em;
          `}
          value={email}
          type="email"
          onChange={({ target: { value } }) => {
            setEmail(value);
          }}
        />
        <button
          css={css`
            font-size: 1em;
            background-color: #804040;
            color: white;
            transition: all 1s;
            :disabled {
              background-color: #d6adad;
            }
          `}
          disabled={!isEmail.isValidSync(email)}
        >
          Suscríbeme
        </button>
      </form>
    </div>
  );
};

const OresResponse = ({ answer }) => {
  if (!answer) return null;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <p>Yo, el Oráculo de Estudio predigo que necesitarás</p>
      <p
        css={css`
          font-size: 2em;
          font-weight: bold;
        `}
      >
        {answer.weekhours} horas de estudio
      </p>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <p>
          esta semana para{" "}
          <span
            css={css`
              font-weight: bold;
            `}
          >
            {answer.name}
          </span>
        </p>
        <button
          css={css`
            background-color: transparent;
            margin: 5px;
          `}
          title={answer.code}
        >
          i
        </button>
      </div>

      <OresSubscribe />
    </div>
  );
};

const Home = ({ courses }) => {
  const [answer, setAnswer] = useState(null);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h1>Soy el Oráculo de Estudio</h1>

      <img
        css={css`
          width: 250px;
          border-radius: 10px;
          transition: box-shadow 0.5s;
          :hover {
            box-shadow: 0px 0px 5px 5px #888;
          }
        `}
        alt="ores-eye"
        src="/eye.png"
      />

      <OresResponse answer={answer} />
      <OresQuestion courses={courses} answer={answer} setAnswer={setAnswer} />
    </div>
  );
};

export default Home;
