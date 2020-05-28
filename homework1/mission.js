var team =[
    { name: '햬리', teamName: '6조', age: 20},
    { name: '예지', teamName: '6조', age: 21},
    { name: '지윤', teamName: '6조', age: 22},
    { name: '정욱', teamName: '6조', age: 23},
    { name: '형준', teamName: '6조', age: 24}
]

function memberprint (member){
    console.log(member.name+'이는 조가 '+member.teamName+'이고, 나이가 '+member.age+'세 입니다!');
}

team.forEach( 
    member => memberprint(member)
);