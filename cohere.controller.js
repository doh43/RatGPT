const cohere = require('cohere-ai');
cohere.init('pJ3B7aXgnujfsLGZ6Tc1b6kGxZQ4Nj6EzoZFZ4wj');


const asyncGetCohereGeneration = async function(coherePrompt) {
	const response = await cohere.generate({
		model: 'command-medium-nightly',
		prompt: coherePrompt,
		max_tokens: 200,
		temperature: 0.7,
		num_generations: 5,
		k: 0,
		p: 1,
		frequency_penalty: 0.5,
		presence_penalty: 0,
		stop_sequences: ['--'],
		return_likelihoods: 'GENERATION',
	});
	if (response.statusCode !== 200) {
		if (response.statusCode === 403) {
			response.status(403).send(response.body);
		}
		else {
			throw new Error(response.body.error.message);
		}
	}
	if (response.body.generations) {
		return response.body.generations;
	}
	else {
		throw new Error('Unsuccessful Request');
	}
};
