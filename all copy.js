// quiz0
function callTotal() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      console.log(response.data.length);
    });
}

callTotal();

// quiz1
function getSexTotal() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      let gender = { men: 0, women: 0 };
      response.data.forEach(function (item) {
        if (item.gender == "男性") {
          gender.men += 1;
        } else {
          gender.women += 1;
        }
      });
      console.log(gender);
    });
}

getSexTotal();

// quiz2
function get31And35() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      let gender = { men: 0, women: 0 };
      response.data.forEach(function (item) {
        if (item.gender == "男性" && item.age == "31~35 歲") {
          gender.men += 1;
        } else if (item.gender == "女性" && item.age == "31~35 歲") {
          gender.women += 1;
        }
      });
      console.log(gender);
    });
}

get31And35();

// quiz3
function get26And30University() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      let gender = { men: 0, women: 0 };
      response.data.forEach(function (item) {
        if (item.age == "26~30 歲" && item.education == "大專院校畢業") {
          if (item.gender == "男性") {
            gender.men += 1;
          } else if (item.gender == "女性") {
            gender.women += 1;
          }
        }
      });
      console.log(gender);
    });
}

get26And30University();

// quiz4
function getAverageAnnualSalary() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      let arr = response.data;
      let total = 0;
      for (let i = 0; i < arr.length; i++) {
        let person = arr[i];
        const salary = person.company.salary.replace(" 萬", "");
        // 先用replace把「萬」字去掉
        // console.log(salary)

        // 用split以波浪號來切開區間的上下界
        const salaryArr = salary.split("~");
        // 問卷中有一筆回答是36萬以下，另外處理，依照老師要求，36 萬以下區間，則採政府基本工資 24,000，保 13 年薪，共 312,000 作為最低區間，360,000 為最高區間，取中位數為 336,000
        if (salaryArr.length === 1) {
          total += 336000;
          continue;
        }
        const med = (Number(salaryArr[0]) + Number(salaryArr[1])) / 2;
        // 再用Number直接將字串轉型，以便計算
        // console.log(med*10000)
        total += med * 10000;
      }
      // console.log(total)
      console.log({
        總人數: arr.length,
        年薪平均值: total / arr.length,
      });
    });
}

getAverageAnnualSalary();

// quiz5
function getRenderTotal() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      let dev = { 不確定這是什麼: 0, CSR: 0, SSR: 0 };
      response.data.forEach(function (item) {
        if (item.first_job.render == "CSR (前後端分離)") {
          dev.CSR += 1;
        } else if (item.first_job.render == "SSR (伺服器選染)") {
          dev.SSR += 1;
        } else {
          dev.不確定這是什麼 += 1;
        }
      });
      console.log(dev);
    });
}

getRenderTotal();

// quiz6

function getAverageIndustrySeven() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      const arr = response.data;
      // 先取出回傳的陣列
      const result = [];
      const industryObj = {};
      const aboveScore7 = [];
      // 宣告空陣列，遍歷每個人的產業，並用.some過濾，形成不重複的產業索引
      const industryList = [];
      arr.forEach(function (item) {
        const isIndustryExist = industryList.some(
          (industry) => industry === item.company.industry
        );
        // industryList done
        if (!isIndustryExist) {
          industryList.push(item.company.industry);
          industryObj[item.company.industry] = {
            companyCount: 1,
            scoreTotal: Number(item.company.score),
          };
        } else {
          const orgObj = industryObj[item.company.industry];
          industryObj[item.company.industry] = {
            companyCount: orgObj.companyCount + 1,
            scoreTotal: orgObj.scoreTotal + Number(item.company.score),
          };
        }
      });
      // 物件industryObj，是由各個產業作為屬性，並由重複次數和總分作為value
      console.log(industryObj);
      industryList.forEach(function (industry) {
        //在陣列result中，加入個別產業和平均分數
        // 在物件中，如果要選的key是變數，要用[]來選取
        result.push({
          industry: industry,
          averageScore:
            industryObj[industry].scoreTotal /
            industryObj[industry].companyCount,
        });
      });
      result.forEach(function (item) {
        if (item.averageScore >= 7) {
          aboveScore7.push(item);
        }
      });
      console.log(aboveScore7);
    });
}
// Simon used double forEach method

getAverageIndustrySeven();

// quiz7
// helped by univ friend
function getCompanyTotal() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      // console.log(response.data)
      const arr = response.data;
      // 先取出回傳的陣列
      const scaleObj = {};
      // 宣告空物件，以便生成新物件
      for (let i = 0; i < arr.length; i++) {
        const person = arr[i];
        const scale = person.company.scale;

        if (scaleObj[scale]) {
          scaleObj[scale] += 1;
        } else {
          scaleObj[scale] = 1;
        }
      }
      console.log(scaleObj);
    });
}
getCompanyTotal();

// quiz8
// 自己做出來好感動TAT
function getSkillTotal() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      const arr = response.data;
      const skillObj = {};
      for (let i = 0; i < arr.length; i++) {
        // 因為物件無法使用foreach方式遍歷每個屬性，改用for迴圈取出每個value
        const person = arr[i];
        const skill = person.first_job.skill;
        // console.log(skill)
        const skillArr = skill.split(",");
        // console.log(skillArr)
        // 把字串用逗號改成陣列
        skillArr.forEach(function (
          element
        ) // 遍歷陣列中的每個元素，並且把元素加入空物件中，有重複則+1，沒有就創建
        {
          if (skillObj[element]) {
            skillObj[element] += 1;
          } else {
            skillObj[element] = 1;
          }
        });
      }
      // for(let j = 0; j < skillArr.length; j++) {}
      console.log(skillObj);
    });
}
getSkillTotal();

// quiz9 題目九：各產業的平均年薪
// input 輸入
// getSkillTotal()

// output 範例輸出格式
// {
//     "教育產業":"平均年薪為682312",
//     "AI":"平均年薪為933212"

//     ...全數列出
// }
function getIndustrySalary() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
    )
    .then(function (response) {
      const arr = response.data;
      const industryObj = {};
      let total = 0;
      const industryList = [];
      let industryAveSal = {};
      arr.forEach(function (item) {
        // 先針對salary進行中位數處理
        const salary = item.company.salary.replace(" 萬", "");
        // 用split以波浪號來切開區間的上下界
        const salaryArr = salary.split("~");
        // 問卷中有一筆回答是36萬以下，另外處理，取其一半來加總
        if (salaryArr.length === 1) {
          total += 336000;
          return total;
        }
        const med = (Number(salaryArr[0]) + Number(salaryArr[1])) / 2;
        // console.log(med);

        const isIndustryExist = industryList.some(
          (industry) => industry === item.company.industry
        );
        if (!isIndustryExist) {
          industryList.push(item.company.industry);
          // industryList done
          industryObj[item.company.industry] = {
            companyCount: 1,
            salaryTotal: Number(med),
          };
        } else {
          const orgObj = industryObj[item.company.industry];
          industryObj[item.company.industry] = {
            companyCount: orgObj.companyCount + 1,
            salaryTotal: orgObj.salaryTotal + Number(med),
          };
        }
      });
      const keysArr = Object.keys(industryObj);
      keysArr.forEach(function (item2) {
        // industryAveSal = {[item2]: industryObj[item2].salaryTotal/ industryObj[item2].companyCount}
        industryAveSal[item2] = `平均年薪為${
          (industryObj[item2].salaryTotal / industryObj[item2].companyCount) *
          10000
        }`;
      });
      // console.log(Object.keys(industryObj))
      console.log(industryAveSal);
      // console.log(industryObj)
      // console.log(industryList)
    });
}
getIndustrySalary();


// quiz10 各產業的各年資的平均薪水滿意度
// input 輸入
async function getSalaryScore() {
  const r = await fetch("https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json");
  const arr = await r.json();

  let obj = {};
  arr.forEach(function(person) {
    const industry = person.company.industry;
    const tenure = person.company.job_tenure;
    const score = Number(person.company.salary_score);

    if (!obj[industry]) {
      obj[industry] = { [tenure]: { count: 1, scoreTotal: score } };
    } else if (!obj[industry][tenure]) {
      obj[industry][tenure] = { count: 1, scoreTotal: score };
    } else {
      const orgData = obj[industry][tenure];
      obj[industry][tenure] = {
        count: orgData.count + 1,
        scoreTotal: orgData.scoreTotal + score,
      };
    }
  });

  let result = [];
  
  const industryArr = Object.keys(obj);
  industryArr.forEach(function(industry) {
    const industryData = obj[industry];
    const tenureArr = Object.keys(industryData);

    let industryObj = {};
    tenureArr.forEach(function(tenure) {
      const data = industryData[tenure];
      const average = data.scoreTotal / data.count;
      industryObj[tenure] = average;
    });
    result.push({ [industry]: industryObj });
  });

  console.log(result);
  // return result;
}

getSalaryScore();


// function indSatiScore() {
//   axios
//     .get(
//       "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
//     )
//     .then(function (response) {
//       const arr = response.data;
//       const industryObj = {};
//       const industryList = [];
//       let jobScoreAve005y;
//       arr.forEach((data) => {
//         const isIndustryExist = industryList.some(
//           (industry) => industry === data.company.industry
//         );
//         if (!isIndustryExist) {
//           industryList.push(data.company.industry);
//         }
//         // industryList done
//         const ind = data.company.industry;
//         const jobTenure = data.company.job_tenure;
//         const salaryScore = data.company.salary_score;

//         let jobSalScore005y = 0;
//         let jobSalScore15y = 0;
//         let jobSalScore25y = 0;
//         let jobSalScore04y = 0;
//         let jobSalScore06y = 0;
//         let jobSalScore08y = 0;
//         let jobSalScore100y = 0;

//         let jobCount005y = 0;
//         let jobCount15y = 0;
//         let jobCount25y = 0;
//         let jobCount04y = 0;
//         let jobCount06y = 0;
//         let jobCount08y = 0;
//         let jobCount100y = 0;

//         if (ind === "教育產業") {
//           console.log(ind, jobTenure, salaryScore);
//           if (jobTenure === "1 年以下") {
//             jobSalScore005y += Number(salaryScore);
//             jobCount005y += 1;
//           } else if (jobTenure === "1~2 年") {
//             jobSalScore15y += Number(salaryScore);
//             jobCount15y += 1;
//           } else if (jobTenure === "2~3 年") {
//             jobSalScore25y += Number(salaryScore);
//             jobCount25y += 1;
//           } else if (jobTenure === "3~5 年") {
//             jobSalScore04y += Number(salaryScore);
//             jobCount04y += 1;
//           } else if (jobTenure === "5~7 年") {
//             jobSalScore06y += Number(salaryScore);
//             jobCount06y += 1;
//           } else if (jobTenure === "7~9 年") {
//             jobSalScore08y += Number(salaryScore);
//             jobCount08y += 1;
//           } else {
//             jobSalScore100y += Number(salaryScore);
//             jobCount100y += 1;
//           }
//         }

//         jobScoreAve005y = jobSalScore005y / jobCount005y;
//       });

//       console.log(jobScoreAve005y);

//       console.log(industryList);
//     });
// }
// indSatiScore();