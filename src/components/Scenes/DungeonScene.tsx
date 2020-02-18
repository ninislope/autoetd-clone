import React, { useEffect } from "react";
import { connect } from "react-redux";
import Fill from "../Fill";
import Box from "../Box";
import Title from "../ui/Title";
import t from "../../t";
import { changeScene, waitDungeonLog, initializeDungeon } from "../../modules/main";
import Log from "../Log";
import pickStore from "../../pickStore";
import { PersonClass } from "../../models";

const mapStateToProps = pickStore("main", [
    "dungeonFloor",
    "dungeonId",
    "dungeonLogIndex",
    "dungeonLogSpeed",
    "dungeonLogs",
    "dungeonTurn",
    "party",
    "persons",
]);

const mapDispatchToProps = {
    changeScene,
    waitDungeonLog,
    initializeDungeon,
};

type MappedState = ReturnType<typeof mapStateToProps>;
type MappedDispatch = typeof mapDispatchToProps;

const DungeonScene: React.FC<MappedState & MappedDispatch> = ({
    dungeonLogIndex,
    dungeonLogSpeed,
    dungeonLogs,
    persons,
    changeScene, // eslint-disable-line no-shadow
    waitDungeonLog, // eslint-disable-line no-shadow
    initializeDungeon, // eslint-disable-line no-shadow
}) => {
    useEffect(() => {
        initializeDungeon();
    }, []);
    useEffect(() => {
        waitDungeonLog(dungeonLogSpeed);
    }, [dungeonLogIndex, dungeonLogSpeed]);

    return (
        <Fill>
            <Title back={() => changeScene("dashboard")}>{t("ダンジョン")}</Title>
            <Box width={15} height={92} left={1} top={7}>
                {persons
                    .map(person => new PersonClass(person))
                    .map(person => (
                        <div key={person.id}>
                            [{person.name}]<br />
                            HP: {person.variable.hp}
                            <br />
                            EP: {person.variable.ep}
                        </div>
                    ))}
            </Box>
            <Box width={82} height={92} left={17} top={7}>
                <Log>
                    {dungeonLogs.slice(0, dungeonLogIndex).map((dungeonLog, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <p key={index}>{dungeonLog}</p>
                    ))}
                </Log>
            </Box>
        </Fill>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DungeonScene);
