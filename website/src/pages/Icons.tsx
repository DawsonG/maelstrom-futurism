import { Icon } from "@maelstrom-futurism/icons";
import { Column, Container, Grid } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";


const Icons = () => (
    <Container>
        <h1>Icons</h1>

        <p>Icons are taken from Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a> unless otherwise noted.</p>

        <CodeView>{`<Icon icon="<name>" />`}</CodeView>

        <Grid>
            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="Add" /> Add
            </Column>
        
            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="AngleUp" /> AngleUp
            </Column>
        
            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="AngleRight" /> AngleRight
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="AngleDown" /> AngleDown
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="AngleLeft" /> AngleLeft
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="CaretUp" /> CaretUp
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="CaretRight" /> CaretRight
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="CaretDown" /> CaretDown
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="CaretLeft" /> CaretLeft
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="Copy" /> Copy
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="Home" /> Home
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="MenuBurger" /> MenuBurger
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="Search" /> Search
            </Column>

            <Column xs={12} sm={6} md={4} lg={3}>
                <Icon icon="DotsHorizontal" /> DotsHorizontal
            </Column>
        </Grid>

    </Container>
);

export default Icons;