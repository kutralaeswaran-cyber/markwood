CREATE TABLE IF NOT EXISTS pdf_documents (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  pdf_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  content_hash CHAR(64) NOT NULL UNIQUE,
  published_date DATE NULL,
  status ENUM('new', 'downloaded', 'processed', 'failed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_sets (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  quiz_date DATE NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  language_mode ENUM('ta', 'en', 'bilingual') NOT NULL DEFAULT 'ta',
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  quiz_set_id BIGINT NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option ENUM('A', 'B', 'C', 'D') NOT NULL,
  explanation TEXT NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
  topic_tag VARCHAR(80) NOT NULL,
  question_hash CHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_question_hash (question_hash),
  CONSTRAINT fk_quiz_set FOREIGN KEY (quiz_set_id) REFERENCES quiz_sets(id)
);

CREATE TABLE IF NOT EXISTS revision_notes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  quiz_set_id BIGINT NOT NULL,
  note_text TEXT NOT NULL,
  topic_tag VARCHAR(80) NOT NULL,
  priority_score INT NOT NULL DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_note_set FOREIGN KEY (quiz_set_id) REFERENCES quiz_sets(id)
);
