import { useState } from "react";

export default function Area() {
  const [search, setSearch] = useState("");

  const areas = [
    "102", "103", "105", "106", "107", "108", "1082", "1085", "1086", "1091", "1092", "1093",
    "1095", "1096", "1108", "111", "1111", "1114", "1115", "112", "1120", "1125", "1128", "1130", "1133",
    "1136", "1138", "1139", "1145", "1146", "1147", "115", "1150", "1155", "1156", "1157", "1159",
    "1163", "1167", "1168", "1170", "1173", "1175", "118", "1185", "1190", "1192", "1194", "1195",
    "12", "1200", "1203", "1204", "1213", "1215", "1218", "1219", "1220", "1221", "1225", "1226",
    "1227", "123", "1235"
  ];

  const filteredAreas = areas.filter((area) => area.includes(search));

  return (
    <section className="px-6 md:px-20 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
        <h2 className="text-3xl font-bold">Areas of Lahore</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search area code"
          className="w-full sm:w-72 px-4 py-2 rounded-full border border-gray-300 text-lg text-center"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {filteredAreas.map((area, index) => (
          <a
            key={index}
            href="#"
            className="block w-16 h-16 rounded-lg border border-gray-300 items-center justify-center text-gray-800 hover:text-blue-600 text-sm shadow-sm"
          >
            {area}
          </a>
        ))}
      </div>
    </section>
  );
}