const express = require('express');
// const articleRouter = require('./routes/RenderData');
const app = express();
const bodyParser = require('body-parser');


const Teacher = [{ UserId: 1234, name: "Änlit" },
{ UserId: 12374, name: "Geetika" }];

let AllRecords = [];

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view-engine', 'ejs');

app.get('/', (req, res) => {
    res.render('LoginForm.ejs');
});

app.get('/TeacherloginForm', (req, res) => {
    res.render('UseLoginForm.ejs', { Path: '/TeacherloginForm' });
});

app.get('/SearchRecords', (req, res) => {
    res.render('UseLoginForm.ejs', { Path: '/SearchRecords' });
});

app.get('/StudentloginForm', (req, res) => {
    res.render('UseLoginForm.ejs', { Path: '/StudentloginForm' });
});

app.get('/AddRecords', (req, res) => {
    res.render('AddRecords.ejs', { AllRecords: {}});
});

app.get('/AllRecords', (req, res) => {
    res.render('AllRecords.ejs', { AllRecords: AllRecords });
});



app.post('/AddNewRecords', (req, res) => {

    let obj = req.body;
    AllRecords.length == 0 ? (obj['ID'] = 1) : (obj['ID'] = AllRecords[AllRecords.length - 1].ID + 1);
    let data = AllRecords &&  AllRecords.filter((x) => x.RollNo == obj.RollNo);
    let DataAlreadyFilled = false;
    //&& (data[0].Name == req.body.Name) && (data[0].DateOfBirth == req.body.DateOfBirth) && (data[0].Score == req.body.Score)
    if(data && data.length > 0)
    {
           AllRecords.forEach((x) => {
               if(x.RollNo ==  obj.RollNo)
               {
                   x.Name = obj.Name;
                   x.DateOfBirth = obj.DateOfBirth;
                   x.Score = obj.Score;
                   DataAlreadyFilled = true;
               }
           });
    }
    if(!DataAlreadyFilled)  AllRecords.push(obj);
    res.redirect('/AllRecords');
});
app.post('/TeacherloginForm', function (req, res) {
    console.log(req.body);
    let data = Teacher.filter((x) => x.UserId == req.body.RollNo);
   // console.log(data);
    if (data && data.length > 0 && (data[0].name == req.body.Name)) {
        //res.render('AllRecords.ejs', { AllRecords: AllRecords });
        res.redirect('/AllRecords');
    }
    else {
        res.render('ErrorPage.ejs' , {error : "User Of that Roll No Don't exist" , path : '/TeacherloginForm'});
    }

});
app.get('/DeleteRecord/:id', (req, res) => {
        
        console.log("-----------------kkkkkkkkkkkkkkkkkkkkkk---------------")
        let data = AllRecords.filter((x) => x.ID != req.params.id);
        AllRecords = data;
       res.redirect('/AllRecords');

});

app.get('/EditRecord/:id', (req, res) => {

    let data = AllRecords.filter((x) => x.ID == req.params.id);
    //console.log(req.params.id,data);
    res.render('AddRecords.ejs', { AllRecords: data[0] });

});

app.post('/StudentloginForm', (req, res) => {

    console.log(req.body);
    let data = AllRecords.filter((x) => x.RollNo == req.body.RollNo);
    console.log(data);
    if (data && data.length > 0 && (data[0].Name == req.body.Name)) {
        res.render('ShowSearchStudentData.ejs', { AllRecords: data[0] });
    }
    else {
        
        res.render('ErrorPage.ejs' , {error : "User Of that Roll No Don't exist" , path : '/StudentloginForm'});
    }

});



app.listen(3000);