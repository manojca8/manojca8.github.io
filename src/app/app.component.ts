import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TerminalLine = { kind: 'command' | 'output' | 'error' | 'success'; text: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('commandInput') commandInput!: ElementRef<HTMLInputElement>;
  @ViewChild('terminalBody') terminalBody!: ElementRef<HTMLDivElement>;

  theme: 'dark' | 'light' = 'dark';
  command = '';
  history: TerminalLine[] = [];
  historyIndex = -1;
  readonly email = 'manojkumarca8@gmail.com';
  readonly github = 'https://github.com/manojca7';
  readonly phone = '+91 9036455404';
  readonly linkedin = 'YOUR_LINKEDIN_URL'; // Add your LinkedIn profile URL before publishing.

  readonly projects = [
    { name: 'Airline digital experience', type: 'Enterprise web application', stack: 'Angular · TypeScript · GraphQL', description: 'Frontend engineering for airline digital journeys and payment-related experiences. Add only project details you are permitted to share.' },
    { name: 'KCET Mock Exam Engine', type: 'Personal project', stack: 'Angular · Node.js · Express · MySQL', description: 'A configurable practice-test platform with questions, options, attempts and answer tracking.' },
    { name: 'Developer portfolio', type: 'Personal project', stack: 'Angular · TypeScript · CSS', description: 'This terminal-inspired portfolio, designed to make professional information easy and fun to explore.' }
  ];

  readonly posts = [
    { date: '2026', category: 'Angular', title: 'A practical guide to Angular standalone components', excerpt: 'How standalone components simplify application structure and reduce NgModule overhead.' },
    { date: '2026', category: 'Frontend', title: 'Building maintainable frontend applications', excerpt: 'A few principles for readable components, clear boundaries and sustainable UI code.' },
    { date: '2026', category: 'Learning', title: 'What I am exploring beyond Angular', excerpt: 'Notes on TypeScript, Node.js, testing, cloud platforms and modern developer tooling.' }
  ];

  ngAfterViewInit(): void {
    this.writeOutput('Welcome to my digital workspace.', 'success');
    this.writeOutput('Type help to explore. Try about, skills, experience, projects, resume, contact or blog.');
    setTimeout(() => this.commandInput?.nativeElement.focus(), 100);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }

  runCommand(raw = this.command): void {
    const value = raw.trim();
    if (!value) return;
    this.history.push({ kind: 'command', text: value });
    this.command = '';
    this.historyIndex = -1;
    const [base, ...args] = value.toLowerCase().split(/\s+/);
    const argument = args.join(' ');

    switch (base) {
      case 'help':
      case '?':
        this.writeOutput('Available commands:');
        this.writeOutput('about       — who I am');
        this.writeOutput('skills      — technical toolkit');
        this.writeOutput('experience  — career snapshot');
        this.writeOutput('projects    — selected work');
        this.writeOutput('resume      — open or download my CV');
        this.writeOutput('contact     — ways to reach me');
        this.writeOutput('blog        — latest writing');
        this.writeOutput('whoami      — quick profile');
        this.writeOutput('ls          — explore portfolio sections');
        this.writeOutput('open github | open linkedin');
        this.writeOutput('clear       — clear terminal');
        break;
      case 'about':
      case 'whoami':
        this.writeOutput('I am Manoj Kumar, a frontend engineer with 11+ years of experience building web applications.');
        this.writeOutput('My core focus is Angular, TypeScript, JavaScript and creating reliable user experiences.');
        this.scrollTo('about');
        break;
      case 'skills':
        this.writeOutput('CORE: Angular · TypeScript · JavaScript · HTML · CSS · RxJS');
        this.writeOutput('ECOSYSTEM: Node.js · GraphQL · REST APIs · AEM · Java');
        this.writeOutput('QUALITY: Jest · Jasmine · Cypress · Playwright · Git · CI/CD');
        this.writeOutput('Exploring: React · AWS · Docker · Kubernetes · GenAI');
        this.scrollTo('skills');
        break;
      case 'experience':
        this.writeOutput('Professional experience: 11+ years in frontend development.');
        this.writeOutput('Focus areas: enterprise applications, Angular architecture, UI engineering and team collaboration.');
        this.writeOutput('Add verified employer names, titles and dates in the Experience section before publishing.');
        this.scrollTo('experience');
        break;
      case 'projects':
  this.writeOutput(
    'The projects section is currently hidden. Please check back later.',
    'success'
  );
  break;
     case 'blog':
  this.writeOutput(
    'The blog section is currently hidden. Please check back later.',
    'success'
  );
  break;
      case 'contact':
        this.writeOutput('Contact details are shown below. Replace the placeholder email and LinkedIn URL before publishing.');
        this.scrollTo('contact');
        break;
      case 'resume':
        this.openResume();
        break;
      case 'clear':
        this.history = [];
        break;
      case 'ls':
        this.writeOutput('about/  skills/  experience/  projects/  resume.pdf  blog/  contact/');
        break;
      case 'open':
        if (argument === 'github') window.open(this.github, '_blank', 'noopener');
        else if (argument === 'linkedin' && this.linkedin.startsWith('https://')) window.open(this.linkedin, '_blank', 'noopener');
        else this.writeOutput('Usage: open github | open linkedin. Add your LinkedIn URL in app.component.ts.', 'error');
        break;
      case 'cat':
        if (argument === 'resume' || argument === 'resume.pdf') this.openResume();
        else this.writeOutput('Try: cat resume', 'error');
        break;
      case 'sudo':
        this.writeOutput('Nice try. This portfolio only accepts safe, predefined commands.', 'error');
        break;
      default:
        this.writeOutput(`Command not found: ${base}. Type help to see available commands.`, 'error');
    }
    setTimeout(() => this.scrollTerminal(), 0);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.runCommand();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const commands = this.history.filter(line => line.kind === 'command');
      if (commands.length) {
        this.historyIndex = Math.min(this.historyIndex + 1, commands.length - 1);
        this.command = commands[commands.length - 1 - this.historyIndex].text;
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const commands = this.history.filter(line => line.kind === 'command');
      this.historyIndex = Math.max(this.historyIndex - 1, -1);
      this.command = this.historyIndex < 0 ? '' : commands[commands.length - 1 - this.historyIndex].text;
    }
  }

  quickCommand(value: string): void {
    this.command = value;
    this.runCommand(value);
  }

  private writeOutput(text: string, kind: TerminalLine['kind'] = 'output'): void {
    this.history.push({ kind, text });
  }

  private scrollTerminal(): void {
    if (this.terminalBody) this.terminalBody.nativeElement.scrollTop = this.terminalBody.nativeElement.scrollHeight;
  }

  private scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private openResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/resume.docx';
    link.download = 'Manoj-Kumar-Resume.docx';
    link.click();
    this.writeOutput('Downloading Manoj-Kumar-Resume.docx...', 'success');
  }

  focusTerminal(): void {
    this.commandInput?.nativeElement.focus();
  }
}
