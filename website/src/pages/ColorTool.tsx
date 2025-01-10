import { useState } from "react";
import Button from "@maelstrom-futurism/button";
import { Box, useTheme } from "@maelstrom-futurism/core";
import { Column, Container, Grid } from "@maelstrom-futurism/layout";
import MfColor from '@maelstrom-futurism/mf-color';

import CodeView from "../components/CodeView";

const ColorTool = () => {
    const { colors } = useTheme();
    const [baseColor, setBaseColor] = useState<MfColor>(new MfColor('ffffff'));

    return (
        <Container width='800px'>
            <h1>ColorTool</h1>

            <Box w='724px' m='0 auto'>
                <Grid direction='row'>
                    <Column>
                        <b>Color Selector</b>
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
                                <Box w='200px' h='200px' bg={`${baseColor.toHex()}`} />
                            </Column>
                            <Column>
                                Base Color - {baseColor.getOriginalColor().toHex()}<br/>
                                Current Color - {baseColor.toHex()}
                            </Column>
                        </Grid>
                    </Column>
                    <Column>
                        <b>Color Modifier</b><br/>
                        <br/>
                        <Button onClick={() => {
                            baseColor.lighten(0.1);
                            setBaseColor(prev => new MfColor(prev.toColor()));
                        }}>Lighten</Button>
                        <Button onClick={() => {
                            baseColor.darken(0.1);
                            setBaseColor(prev => new MfColor(prev.toColor()));
                        }}>Darken</Button>
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
                        <Box
                            w='60px'
                            h='60px'
                            bg={colors[key as keyof typeof colors]}
                            onClick={() => {
                                setBaseColor(new MfColor(colors[key as keyof typeof colors]));
                            }} />
                    </Column>
                </Grid>
            ))}
            

            <CodeView>{JSON.stringify(colors, null, 4)}</CodeView>
        </Container>
    );
};

export default ColorTool;