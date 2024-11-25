import { useTheme } from "@maelstrom-futurism/core";
import { Container } from "@maelstrom-futurism/layout";
import CodeView from "../components/CodeView";


const ColorTool = () => {
    const { colors } = useTheme();

    return (
        <Container width='800px'>
            <h1>ColorTool</h1>
            {Object.keys(colors).map(key => (
                <div>
                    {key}
                
                    <div style={{
                        height: '60px',
                        width: '60px',
                        backgroundColor: colors[key as keyof typeof colors],
                    }}></div>
                </div>
            ))}
            

            <CodeView>{JSON.stringify(colors, null, 4)}</CodeView>
        </Container>
    );
};

export default ColorTool;