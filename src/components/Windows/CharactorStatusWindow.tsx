import React from "react";
import { connect } from "react-redux";
import Fill from "../Fill";
import pickStore from "../../pickStore";
import { CharacterType } from "../../models/CharacterType";
import t from "../../t";

const mapStateToProps = pickStore("main", ["persons"]);

type MappedState = ReturnType<typeof mapStateToProps>;

export interface CharactorStatusWindowProps {
    personId: number;
    characterType: CharacterType;
}

const CharactorStatusWindow: React.FC<CharactorStatusWindowProps & MappedState> = ({
    persons,
    personId,
    characterType,
}) => {
    const person = persons[personId];
    const character = person.characters[characterType];
    if (!character) return <></>;
    return (
        <Fill>
            {t("名前")}: {character.name}
        </Fill>
    );
};

export default connect(mapStateToProps)(CharactorStatusWindow);
