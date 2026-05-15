import express from 'express';
import uniqid from 'uniqid';
import fs from 'fs';
import cors from 'cors';
import { GPTScript } from '@gptscript-ai/gptscript';
import { RunEventType } from '@gptscript-ai/gptscript';

const gptscript = new GPTScript();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!' )
});

app.get('/create-story', async (req, res) => {
    const url = req.query.url;
    const dir = uniqid();
    const path = './stories/'+dir;
    fs.mkdirSync(path, {recursive: true});
    console.log({
        url,
    });
    const run = await gptscript.run('./story.gpt', {
        input: `--url ${url} --dir ${path}`,
        disableCache: true,
    });
    run.on(RunEventType.Event, ev => {
        if (ev.type === RunEventType.CallFinish && ev.output) {
            console.log(ev.output);
        }
    });
    const result = await run.text();
    res.json(result);
});

app.listen(8080, () => {
    console.log(`Listening on port 8080`);
});
