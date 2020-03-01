import { Component, OnDestroy } from "@angular/core";
import { Answers } from "src/app/api/models/puzzle-hero";
import { SimpleModalComponent } from "ngx-simple-modal";
import { select, Store } from "@ngrx/store";
import { getPuzzleHeroAnswerFile, getPuzzleHeroAnswerLoading, State } from "./store/answers.reducer";
import { LoadFile, ResetState, AcceptAnswer, RefuseAnswer } from "./store/answers.actions";
import { FileUtils } from "../../../../../utils/file.utils";

interface AnswersModal {
    answers: Answers[];
}

@Component({
    selector: "app-answers",
    templateUrl: "answers.template.html",
    styleUrls: ["answers.style.scss"]
})
export class AnswersComponent extends SimpleModalComponent<AnswersModal, void> implements OnDestroy {
    public loading$ = this.store$.pipe(select(getPuzzleHeroAnswerLoading));
    public file$ = this.store$.pipe(select(getPuzzleHeroAnswerFile));

    public answers: Answers[];
    public validating: Answers = null;

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.store$.dispatch(new ResetState());
    }

    public onClose() {
        this.close();
    }

    public isValidated(answer: Answers) {
        return answer.validated || answer.validated === null || answer.validated === undefined;
    }

    public validate(answer: Answers) {
        this.validating = answer;
        this.store$.dispatch(new LoadFile(answer.puzzle, answer._id));
    }

    public download(url: string) {
        FileUtils.downloadFileFromUrl(url);
    }

    public cancel() {
        this.store$.dispatch(new ResetState());
        this.validating = null;
    }

    public refuse() {
        this.answers.find(x => x._id === this.validating._id).refused = true;
        this.store$.dispatch(new RefuseAnswer(this.validating.puzzle, this.validating._id));
        this.validating = null;
    }

    public accept() {
        this.answers.find(x => x._id === this.validating._id).validated = true;
        this.store$.dispatch(new AcceptAnswer(this.validating.puzzle, this.validating._id));
        this.validating = null;
    }
}
