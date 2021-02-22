import React, { useState, useMemo } from "react";
import { shuffle as lodashShuffle } from "lodash";
import Confetti from "react-confetti";

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

  const yoloMembers = useMemo(() => {
    if (localStorage.getItem("yoloMembers")) {
      return localStorage.getItem("yoloMembers");
    } else {
      const yolo = [
        { name: "Peppe", done: false },
        { name: "Peter Ö", done: false },
        { name: "Janaki", done: false },
        { name: "Alex", done: false },
        { name: "Julia", done: false },
        { name: "Harry", done: false },
        { name: "Jason", done: false },
        { name: "Marcio", done: false },
        { name: "Marcus", done: false },
        { name: "Andy", done: false },
        { name: "Pierre", done: false },
      ];
      localStorage.setItem("yoloMembers", JSON.stringify(yolo));
      return JSON.stringify(yolo);
    }
  }, []);

  useMemo(() => {
    if (localStorage.getItem("champsMembers")) {
      return localStorage.getItem("champsMembers");
    } else {
      const champs = [
        { name: "Tommy", done: false },
        { name: "Jonas", done: false },
        { name: "Samira", done: false },
        { name: "Edvan", done: false },
        { name: "Carl-Axel", done: false },
        { name: "Happy", done: false },
        { name: "Harry", done: false },
        { name: "Jason", done: false },
        { name: "Marcio", done: false },
        { name: "Marcus", done: false },
        { name: "Andy", done: false },
        { name: "Pierre", done: false },
      ];
      localStorage.setItem("champsMembers", JSON.stringify(champs));
      return JSON.stringify(champs);
    }
  }, []);

  useMemo(() => {
    if (localStorage.getItem("unityMembers")) {
      return localStorage.getItem("unityMembers");
    } else {
      const unity = [
        { name: "Tereza", done: false },
        { name: "Vassil", done: false },
        { name: "Krasimir", done: false },
        { name: "Georgi", done: false },
        { name: "Nedyalko", done: false },
        { name: "Plamen", done: false },
        { name: "Stoil", done: false },
        { name: "Mihail", done: false },
        { name: "Jason", done: false },
        { name: "Marcio", done: false },
        { name: "Marcus", done: false },
        { name: "Harry", done: false },
        { name: "Pierre", done: false },
      ];
      localStorage.setItem("unityMembers", JSON.stringify(unity));
      return JSON.stringify(unity);
    }
  }, []);

  const [members, setMembers] = useState(JSON.parse(yoloMembers));
  const [emojis, setEmojis] = useState(baseEmojis);
  const [selectedTeam, setSelectedTeam] = useState("yolo");
  const [newMember, setNewMember] = useState("");

  const shuffle = (arr) => lodashShuffle(arr);

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
      const updatedMembers = [...members, { name: newMember, done: false }];
      setMembers(updatedMembers);
      localStorage.setItem(
        `${selectedTeam}Members`,
        JSON.stringify(updatedMembers)
      );
      setNewMember("");
    }
  };

  const removeMember = (event, member) => {
    event.stopPropagation();
    const updatedMembers = members.filter((mem) => mem.name !== member);
    setMembers(updatedMembers);
    setEmojis(shuffle(baseEmojis));
    localStorage.setItem(
      `${selectedTeam}Members`,
      JSON.stringify(updatedMembers)
    );
  };

  const handleChange = (event) => {
    setNewMember(event.target.value);
  };

  return (
    <div className="StandupWrapper">
      {members.every((m) => m.done) && (
        <Confetti
          width={window.innerWidth}
          height={window.window.innerHeight}
        />
      )}
      <div className="BtnGroup">
        <button
          className={
            selectedTeam === "yolo" ? "PrimaryButton selected" : "PrimaryButton"
          }
          onClick={() => {
            setSelectedTeam("yolo");
            setMembers(JSON.parse(localStorage.getItem("yoloMembers")));
          }}
        >
          YOLO
        </button>
        <button
          className={
            selectedTeam === "champs"
              ? "PrimaryButton selected"
              : "PrimaryButton"
          }
          onClick={() => {
            setSelectedTeam("champs");
            setMembers(JSON.parse(localStorage.getItem("champsMembers")));
          }}
        >
          CHAMPS
        </button>
        <button
          className={
            selectedTeam === "unity"
              ? "PrimaryButton selected"
              : "PrimaryButton"
          }
          onClick={() => {
            setSelectedTeam("unity");
            setMembers(JSON.parse(localStorage.getItem("unityMembers")));
          }}
        >
          UNITY
        </button>
      </div>
      <ul>
        {members.map((member, i) => {
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
        })}
        <li>
          <form onSubmit={submitNewMember}>
            <input
              type="text"
              placeholder="Not on the list?"
              value={newMember}
              onChange={handleChange}
            />
            <input
              className="SecondaryButton"
              type="submit"
              value="Add member"
            />
          </form>
        </li>
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
    </div>
  );
}

export default StandupContainer;
