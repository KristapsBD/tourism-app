import RouteUpdate from "../components/route/RouteUpdate.jsx";
import RouteCreate from "../components/route/RouteCreate.jsx";
import TaskCreate from "../components/task/TaskCreate.jsx";
import TaskUpdate from "../components/task/TaskUpdate.jsx";
import RouteIdeaSubmission from "../components/route/RouteIdeaSubmission.jsx";
import TaskIdeaSubmission from "../components/task/TaskIdeaSubmission.jsx";
import TaskAnswer from "../components/task/TaskAnswer.jsx";
import GameTimeForm from "../components/game/GameTime.jsx";

export default function kgzTest(){
    return (
        //<RouteCreate/>
        //<RouteUpdate/>
        //<TaskCreate/>
        //<RouteUpdate/>
        //<TaskCreate locationID={1}/>
        <TaskUpdate taskId={1}/>
        //<RouteIdeaSubmission/>
        //<TaskIdeaSubmission/>
        //<TaskAnswer/>
        //<GameTimeForm/>
    )
}