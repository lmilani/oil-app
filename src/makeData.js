import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newSampleIssue = () => {
  const statusChance = Math.random();
  return {
    oil_iprop_id: 1,
    oil_iprop_issue_type: namor.generate({ words: 1, numbers: 0 }),
    oil_iprop_timing: Math.floor(Math.random() * 30),
    oil_iprop_description: Math.floor(Math.random() * 100),
    oil_iprop_priority: Math.floor(Math.random() * 100),
    oil_iprop_owner: namor.generate({ words: 1, numbers: 0 }),
    oil_iprop_target_resolution_date: namor.generate({ date: 1 }),
    oil_iprop_status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
    oil_iprop_action: namor.generate({ workds: 1 })
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newSampleIssue(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
