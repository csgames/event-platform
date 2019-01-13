import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

const Duration _kExpand = Duration(milliseconds: 200);

class ExpansionCard extends StatefulWidget {
    const ExpansionCard({
        Key key,
        this.leading,
        @required this.title,
        this.backgroundColor,
        this.onExpansionChanged,
        this.children = const <Widget>[],
        this.initiallyExpanded = false,
    }) : assert(initiallyExpanded != null),
            super(key: key);

    final Widget leading;

    final Widget title;

    final ValueChanged<bool> onExpansionChanged;

    final List<Widget> children;

    final Color backgroundColor;

    final bool initiallyExpanded;

    @override
    _ExpansionCardState createState() => _ExpansionCardState();
}

class _ExpansionCardState extends State<ExpansionCard> with SingleTickerProviderStateMixin {
    AnimationController _controller;
    CurvedAnimation _easeOutAnimation;
    CurvedAnimation _easeInAnimation;
    ColorTween _borderColor;
    ColorTween _headerColor;
    ColorTween _iconColor;
    ColorTween _backgroundColor;

    bool _isExpanded = false;

    @override
    void initState() {
        super.initState();
        _controller = AnimationController(duration: _kExpand, vsync: this);
        _easeOutAnimation = CurvedAnimation(parent: _controller, curve: Curves.easeOut);
        _easeInAnimation = CurvedAnimation(parent: _controller, curve: Curves.easeIn);
        _borderColor = ColorTween();
        _headerColor = ColorTween();
        _iconColor = ColorTween();
        _backgroundColor = ColorTween();

        _isExpanded = PageStorage.of(context)?.readState(context) ?? widget.initiallyExpanded;
        if (_isExpanded)
            _controller.value = 1.0;
    }

    @override
    void dispose() {
        _controller.dispose();
        super.dispose();
    }

    void _handleTap() {
        setState(() {
            _isExpanded = !_isExpanded;
            if (_isExpanded)
                _controller.forward();
            else
                _controller.reverse().then<void>((v) {
                    setState(() {
                        // Rebuild without widget.children.
                    });
                });
            PageStorage.of(context)?.writeState(context, _isExpanded);
        });
        if (widget.onExpansionChanged != null)
            widget.onExpansionChanged(_isExpanded);
    }

    Widget _buildChildren(BuildContext context, Widget child) {
        final Color titleColor = _headerColor.evaluate(_easeInAnimation);

        return Container(
            decoration: BoxDecoration(
                color: _backgroundColor.evaluate(_easeOutAnimation) ?? Colors.transparent,
            ),
            child: Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                    IconTheme.merge(
                        data: IconThemeData(color: _iconColor.evaluate(_easeInAnimation)),
                        child: ListTile(
                            contentPadding: EdgeInsets.all(0),
                            onTap: _handleTap,
                            leading: widget.leading,
                            title: DefaultTextStyle(
                                style: Theme.of(context).textTheme.subhead.copyWith(color: titleColor),
                                child: widget.title,
                            )
                        ),
                    ),
                    ClipRect(
                        child: Align(
                            heightFactor: _easeInAnimation.value,
                            child: child,
                        ),
                    ),
                ],
            ),
        );
    }

    @override
    Widget build(BuildContext context) {
        final ThemeData theme = Theme.of(context);
        _borderColor.end = theme.dividerColor;
        _headerColor
            ..begin = theme.textTheme.subhead.color
            ..end = theme.accentColor;
        _iconColor
            ..begin = theme.unselectedWidgetColor
            ..end = theme.accentColor;
        _backgroundColor.end = widget.backgroundColor;

        final bool closed = !_isExpanded && _controller.isDismissed;
        return AnimatedBuilder(
            animation: _controller.view,
            builder: _buildChildren,
            child: closed ? null : Column(children: widget.children),
        );

    }
}