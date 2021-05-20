export function operation(){
  return [{
    value: '种植',
    label: '种植'
  }, {
    value: '除草',
    label: '除草'
  }, {
    value: '施肥',
    label: '施肥'
  }, {
    value: '施药',
    label: '施药'
  }, {
    value: '锄地',
    label: '锄地'
  }, {
    value: '修剪',
    label: '修剪'
  }, {
    value: '收获',
    label: '收获'
  }]
}

export function person(){
  return [{
    value: '王一',
    label: '王一'
  },{
    value: '李二',
    label: '李二'
  },{
    value: '张三',
    label: '张三'
  },{
    value: '赵四',
    label: '赵四'
  }]
}


export function plantTypes() {
  return [{
    value: '粮食作物',
    label: '粮食作物'
  },{
    value: '油料作物',
    label: '油料作物'
  },{
    value: '蔬菜作物',
    label: '蔬菜作物'
  },{
    value: '果类',
    label: '果类'
  },{
    value: '药用作物',
    label: '药用作物'
  }]
}

export function operMerOptions() {
  return [{
    value: '日常检查',
    label: '日常检查'
  },{
    value: '故障尚未维修',
    label: '故障尚未维修'
  },{
    value: '故障返厂维修',
    label: '故障返厂维修'
  },{
    value: '上门维修',
    label: '上门维修'
  },{
    value: '正常运转',
    label: '正常运转'
  }]
}

export function arrFormat(data){
  let arr = [];
  arr.push(["Value","type","date"])
  for(let i in data){
    for(let j in data[i]){
      if(j != 'date'){
        let temp = [];
        temp.push(data[i][j]);
        temp.push(j);
        temp.push(data[i]['date']);
        arr.push(temp);
      }
    }
  }
  return arr;

}