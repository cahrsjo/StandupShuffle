import React, { useState, useMemo, useEffect } from "react";
import { shuffle } from "lodash";
import Confetti from "react-confetti";
import pizza from "./pizza.png";
import EmptyState from "./EmptyState.js";

const loadingTexts = [
  "Stringing the cheese...",
  "Adding pineapple...",
  "Crunching the crust...",
  "Baking...",
  "Processing payment...",
  "Charging for soda...",
  "Chopping salami...",
];

function StandupContainer() {
  const baseEmojis = useMemo(
    () => [
      "🦄",
      "🐭",
      "🐛",
      "🐶",
      "🐵",
      "🦉",
      "🐳",
      "🐈",
      "🐻",
      "🦆",
      "🐸",
      "🐤",
      "🦩",
      "🐞",
      "🐙",
      "🦖",
      "🦁",
      "🐰",
      "🐲",
      "🐿",
    ],
    []
  );

  const savedMembers = useMemo(() => {
    if (localStorage.getItem("members")) {
      return localStorage.getItem("members");
    }
    return [];
  }, []);

  const [members, setMembers] = useState(
    !savedMembers.length ? savedMembers : JSON.parse(savedMembers)
  );
  const [emojis, setEmojis] = useState(baseEmojis);
  const [newMember, setNewMember] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState([
    { task: "bugs", done: false },
    { task: "pr", done: false },
    { task: "jenkins", done: false },
  ]);
  const [loading, setLoading] = useState(true);
  const [loadText, setLoadText] = useState(shuffle(loadingTexts)[0]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  });

  const checkMember = (member) => {
    setMembers(
      members.map((mem) => {
        if (mem.name === member) {
          mem.done = !mem.done;
        }
        return mem;
      })
    );
  };

  const submitNewMember = (event) => {
    event.preventDefault();
    if (newMember) {
      if (members.some((m) => m.name === newMember)) {
        alert("Participant already exists!");
        return;
      }
      const updatedMembers = [...members, { name: newMember, done: false }];
      setMembers(updatedMembers);
      localStorage.setItem("members", JSON.stringify(updatedMembers));
      setNewMember("");
    }
  };

  const resetTeams = () => {
    // eslint-disable-next-line
    const confirmed = confirm(
      "Are you sure? All participants will be deleted."
    );

    if (!confirmed) return;
    localStorage.setItem("members", []);
    setMembers([]);
    setAdditionalInfo([
      { task: "bugs", done: false },
      { task: "pr", done: false },
      { task: "jenkins", done: false },
    ]);
  };

  const removeMember = (event, member) => {
    event.stopPropagation();
    const updatedMembers = members.filter((mem) => mem.name !== member);
    setMembers(updatedMembers);
    setEmojis(shuffle(baseEmojis));
    localStorage.setItem("members", JSON.stringify(updatedMembers));
  };

  const handleChange = (event) => {
    setNewMember(event.target.value);
  };

  const updateAdditionalInfo = (task) => {
    const changedTasks = additionalInfo.map((t) => {
      if (t.task === task) {
        t.done = !t.done;
      }
      return t;
    });
    setAdditionalInfo(changedTasks);
  };

  return (
    <div className="StandupWrapper">
      {loading ? (
        <div className="pizzaWrapper">
          <div className="spinner">
            <img src={pizza} className="pizza-part pizza-part-1" alt="pizza1" />
            <img src={pizza} className="pizza-part pizza-part-2" alt="pizza2" />
            <img src={pizza} className="pizza-part pizza-part-3" alt="pizza3" />
            <img src={pizza} className="pizza-part pizza-part-4" alt="pizza4" />
          </div>
          <div className="loadingText">{loadText}</div>
        </div>
      ) : (
        <>
          {members.every((m) => m.done) &&
            additionalInfo.every((t) => t.done) && (
              <Confetti
                numberOfPieces={100}
                width={window.innerWidth}
                height={window.window.innerHeight}
              />
            )}

          <ul>
            {!members.length ? (
              <EmptyState />
            ) : (
              members.map((member, i) => {
                return (
                  <li key={member.name}>
                    <div
                      onClick={() => checkMember(member.name)}
                      className={member.done ? "Member MemberDone" : "Member"}
                    >
                      <div
                        className="DeleteEmoji"
                        title="Click to delete"
                        onClick={(ev) => removeMember(ev, member.name)}
                      >
                        {emojis[i]}
                      </div>
                      <div className="MemberName">{member.name}</div>
                    </div>
                  </li>
                );
              })
            )}
            <li>
              <div
                style={{
                  display: members.length ? "flex" : "none",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={additionalInfo.find(
                      (a) => a.task === "bugs" && a.done
                    )}
                    onChange={() => updateAdditionalInfo("bugs")}
                  />
                  <span onClick={() => updateAdditionalInfo("bugs")}>Bugs</span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={additionalInfo.find(
                      (a) => a.task === "pr" && a.done
                    )}
                    onChange={() => updateAdditionalInfo("pr")}
                  />
                  <span onClick={() => updateAdditionalInfo("pr")}>
                    Open PRs
                  </span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={additionalInfo.find(
                      (a) => a.task === "jenkins" && a.done
                    )}
                    onChange={() => updateAdditionalInfo("jenkins")}
                  />
                  <span onClick={() => updateAdditionalInfo("jenkins")}>
                    Jenkins
                  </span>
                </div>
              </div>
              <form onSubmit={submitNewMember}>
                <input
                  type="text"
                  placeholder="Participant name"
                  value={newMember}
                  onChange={handleChange}
                />
                <input className="SecondaryButton" type="submit" value="ADD" />
              </form>
            </li>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className="SecondaryButton" onClick={() => resetTeams()}>
                RESET EVERYTHING
              </button>
            </div>
          </ul>
          <button
            className="PrimaryButton"
            onClick={() => {
              setMembers(shuffle(members));
              setEmojis(shuffle(baseEmojis));
            }}
          >
            ✨ SHUFFLE ✨
          </button>
        </>
      )}
    </div>
  );
}

export default StandupContainer;
