import React, { PureComponent } from "react";
import { Wrapper, Title, List, TitleItem, Item } from "./styles";
import { course } from "./json/course";
import { Link } from "react-router-dom";

class Container extends PureComponent {
  render() {
    const getScoreStore = JSON.parse(localStorage.getItem("score"));
    return (
      <Wrapper>
        <Title>
          <TitleItem>Course</TitleItem>
          <TitleItem>Score</TitleItem>
          <TitleItem>Take</TitleItem>
        </Title>
        {course &&
          course.map(c => {
            const scoreJson = c.score !== "" ? c.score : "Not Taken";
            return (
              <List key={c.id}>
                <Item>{c.name}</Item>
                <Item>
                  {getScoreStore && getScoreStore[c.id]
                    ? getScoreStore[c.id]
                    : scoreJson}
                </Item>
                <Item>
                  <Link to={`/course/${c.id}`}>Take test </Link>
                </Item>
              </List>
            );
          })}
      </Wrapper>
    );
  }
}

export default Container;
