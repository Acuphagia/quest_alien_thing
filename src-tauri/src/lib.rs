// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

// Including the libaries
use rust_bert::pipelines::question_answering::
{
    QaInput, QuestionAnsweringModel
};

use rand::
{
    thread_rng, Rng
};

#[tauri::command]
fn greet(name: &str) -> String
{
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn skibidi(_name: &str) -> String
{
    format!("Hello, ohio rizzy, you are very skibidi toilet")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, skibidi, chat_bot]) // <-- add chat_bot here
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn chat_bot(question: &str, context: &str) -> String
{
    let qa_model = QuestionAnsweringModel::new(Default::default())
        .expect("Failed to load QA model");

    let answers = qa_model.predict(
        &[QaInput
        {
            question: question
                .to_string(),
            context: context
                .to_string(),
        }],
        1,
        32,
    );

    if let Some(answer_vec) = answers
        .get(0)
    {
        if let Some(answer) = answer_vec
            .get(0)
        {
            let random_ending_text = if thread_rng()
                .gen_range(0..2) == 0
            {
                "."
            } else
            {
                "?"
            };

            let reply_templates = [
                format!("I- I don't really know, but according to some documents I found, the answer is probably {}{}", answer
                    .answer, random_ending_text),
                format!("Well, according to Internet Explorer, I’m guessing it's {}, but I could be wrong on that one.", answer
                    .answer),
                format!("Hold up, let me just look through my papers real quick... uhh, {}{}", answer
                    .answer, random_ending_text),
                format!("I think the answer is {}, but I’m not entirely sure, so don't take my word for it.", answer
                    .answer),
                format!("Oh.. That, yeah; it's uhh.. {}.", answer
                    .answer),
                format!("You are asking wayy too many questions for somebody at your rank, here, but i'll let it slide just this time, it's.. {}", answer
                    .answer),
            ];

            let choice = thread_rng()
                .gen_range(0..reply_templates
                    .len());
            reply_templates[choice]
                .clone()
        } else
        {
            "Th-- Th-- The intercom is bugging out, I.. Work you stupid idiot, it-- it's not working very well, could you repeat that, please?".to_string()
        }

    // I know that this is repeated code, but I am afraid to delete it
    } else
    {
        "Th-- Th-- The intercom is bugging out, I.. Work you stupid idiot, it-- it's not working very well, could you repeat that, please?".to_string()
    }
}
