# DataPraxis

Project website and preprint for **DataPraxis: Scaling Analytics Tasks via Verified Workspace Evolution**.

- Website: https://obitojn.github.io/DataPraxis/
- Dataset: https://huggingface.co/datasets/stargazerhust/DataPraxis-5k
- Paper: [PDF](assets/DataPraxis.pdf)
- arXiv upload source: [LaTeX ZIP](assets/DataPraxis-arxiv.zip), main file `arxiv.tex`

## Website

A static site with no build step or external JavaScript dependencies. Serve locally with:

```sh
python3 -m http.server 8000
```

The site is deployed through GitHub Pages from the root of the `main` branch. The figures, reported results, and cases are drawn from the accompanying paper. This repository provides the project page and paper artifacts, not the training or synthesis implementation.

The visual structure is inspired by [WorldCast](https://teal024.github.io/WorldCast/). This site uses an original implementation.

## Updating

- Main text and author information: `index.html`
- Result values and interactions: `assets/main.js`
- Styles: `assets/style.css`
- Citation: `citation.bib` and the citation block in `index.html`
- Paper and LaTeX package: `assets/DataPraxis.pdf`, `assets/DataPraxis-arxiv.zip`

The preprint preserves the original paper template and author affiliation order. The anonymous conference submission remains separate.
