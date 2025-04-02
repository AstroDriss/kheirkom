import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";

const team = [
  { name: "Idriss Douiri", role: "developer", img: "" },
  { name: "Sami-ziad Zaaboul", role: "Leader", img: "" },
  { name: "Mohammed Amine Achnaoui", role: "Graphic Designer", img: "" },
];

const index = () => {
  return (
    <section className="section-space">
      <h2 className="mb-2 text-2xl font-semibold">Team Members</h2>
      <p>Delivered by MLD student:</p>

      <ul className="flex flex-wrap gap-3 mt-3">
        {team.map((member) => (
          <li
            key={member.name}
            className="p-3 rounded-xl border flex gap-2 items-center"
          >
            <Avatar>
              <AvatarImage src={member.img} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>

            <div>
              <p>{member.name}</p>
              <p className="text-gray-400">{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default index;
