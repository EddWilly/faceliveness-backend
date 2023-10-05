import { openAiConfig } from "../../../src/configs/openai.js";

export async function textController(req, res) {


  try{

    const { input } = req.body;
    
    
    const response = await openAiConfig.moderations.create({
      input,
     })

    const flagged = response.results[0].flagged
    
    return res.json({inappropriate: flagged})
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
  }

}

/*
{
	"id": "modr-85KRg70c6eDsOfZY8GPSfUefmJfJJ",
	"model": "text-moderation-006",
	"results": [
		{
			"flagged": true,
			"categories": {
				"sexual": false,
				"hate": false,
				"harassment": true,
				"self-harm": false,
				"sexual/minors": false,
				"hate/threatening": false,
				"violence/graphic": false,
				"self-harm/intent": false,
				"self-harm/instructions": false,
				"harassment/threatening": false,
				"violence": false
			},
			"category_scores": {
				"sexual": 0.47151991724967957,
				"hate": 0.0016288697952404618,
				"harassment": 0.49433180689811707,
				"self-harm": 7.983757654983492e-7,
				"sexual/minors": 0.00035455665783956647,
				"hate/threatening": 0.00006597817991860211,
				"violence/graphic": 0.00000668634947942337,
				"self-harm/intent": 1.1373574970718892e-8,
				"self-harm/instructions": 1.5734535452338605e-7,
				"harassment/threatening": 0.015263162553310394,
				"violence": 0.003228302113711834
			}
		}
	]
}
*/