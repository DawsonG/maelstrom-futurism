import { Box, useTheme, formatStringAsHexColor } from "@maelstrom-futurism/core";
import { Column, Container, Grid } from "@maelstrom-futurism/layout";
import { darken } from 'polished';

import CodeView from "../components/CodeView";
import { useState } from "react";

const ColorTool = () => {
    const { colors } = useTheme();

    const [baseColor, setBaseColor] = useState('ffffff');
    const [currentColor, setCurrentColor] = useState('ffffff');

    return (
        <Container width='800px'>
            <h1>ColorTool</h1>

            <Box w='724px' m='0 auto'>
                <Grid direction='row'>
                    <Column>
                        <b>Color Selector</b>
                        <SliderPicker />
                    </Column>
                    <Column>
                        <Grid
                            w='210px'
                            direction='column'
                        >
                            <Column>
                                Custom Color
                            </Column>
                            <Column>
                                <Box w='200px' h='200px' bg={`#${baseColor}`} />
                            </Column>
                            <Column>
                                Base Color - {formatStringAsHexColor(baseColor)}<br/>
                                Current Color - {formatStringAsHexColor(currentColor)}
                            </Column>
                        </Grid>
                    </Column>
                    <Column>
                        <b>Color Modifier</b>
                    </Column>
                </Grid>
            </Box>

            {Object.keys(colors).map(key => (
                <Grid key={key} justifyContent='space-between'>
                    <Column>
                        {key}
                    </Column>
                    <Column>
                        {colors[key as keyof typeof colors]}
                    </Column>
                    <Column>
                        <Box w='60px' h='60px' bg={colors[key as keyof typeof colors]} />
                    </Column>
                </Grid>
            ))}
            

            <CodeView>{JSON.stringify(colors, null, 4)}</CodeView>
        </Container>
    );
};

export default ColorTool;